import 'dart:async';
import 'dart:convert';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:indoor_localization/domain/entities/asset.dart';
import 'package:indoor_localization/domain/entities/facility.dart';
import 'package:indoor_localization/domain/services/asset_service.dart';
import 'floor_map_painter.dart';

class FloorMapWidget extends StatefulWidget {
  final Facility facility;
  final List<Asset> assets;
  final Function()? onRefresh;

  const FloorMapWidget({
    Key? key,
    required this.facility,
    required this.assets,
    this.onRefresh,
  }) : super(key: key);

  @override
  State<FloorMapWidget> createState() => FloorMapWidgetState();
}

class FloorMapWidgetState extends State<FloorMapWidget> {
  Timer? _timer;
  ui.Image? _floorMapImage;
  double _scale = 1.0;
  List<Asset> _assets = [];
  bool _isLoading = true;
  bool _showGrid = false;
  final TransformationController _transformationController = TransformationController();

  void resetScale() {
    if (_transformationController.value.getMaxScaleOnAxis() > 1.0) {
      _transformationController.value = Matrix4.identity();
      setState(() {
        _scale = 1.0;
      });
    }
  }

  void toggleGrid() {
    setState(() {
      _showGrid = !_showGrid;
    });
  }

  @override
  void initState() {
    super.initState();
    _loadImage();
    _startUpdates();
  }

  @override
  void didUpdateWidget(FloorMapWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.facility.imageBase64 != oldWidget.facility.imageBase64) {
      setState(() => _isLoading = true);
      _loadImage();
    }
  }

  Future<void> _loadImage() async {
    try {
      final bytes = base64Decode(widget.facility.imageBase64);
      final codec = await ui.instantiateImageCodec(bytes);
      final frame = await codec.getNextFrame();
      
      if (mounted) {
        setState(() {
          _floorMapImage = frame.image;
          _isLoading = false;
        });
      }
    } catch (e) {
      print('Error loading image: $e');
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  Future<void> _updateAssets() async {
    try {
      final updatedAssets = await AssetService.getAll();
      if (mounted) {
        setState(() {
          _assets = updatedAssets
              .where((a) => a.floorMapId == widget.facility.id)
              .toList();
        });
      }
    } catch (e) {
      print('Error updating assets: $e');
    }
  }

  void _startUpdates() {
    _timer?.cancel();
    _timer = Timer.periodic(Duration(milliseconds: 500), (timer) async {
      if (widget.onRefresh != null) {
        await widget.onRefresh!();
      }
      await _updateAssets();
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Center(child: CircularProgressIndicator());
    }

    if (_floorMapImage == null) {
      return Center(
        child: Text('Error loading floor map image', 
          style: TextStyle(color: Colors.red)),
      );
    }

    return InteractiveViewer(
      transformationController: _transformationController,
      boundaryMargin: EdgeInsets.all(20),
      minScale: 0.5,
      maxScale: 5.0,
      onInteractionUpdate: (details) {
        setState(() {
          _scale = _transformationController.value.getMaxScaleOnAxis();
        });
      },
      child: CustomPaint(
        painter: FloorMapPainter(
          floorMap: _floorMapImage!,
          assets: _assets.isEmpty ? widget.assets : _assets,
          zones: widget.facility.zones,
          scale: _scale,
          showGrid: _showGrid,
        ),
        size: Size.infinite,
      ),
    );
  }
}
