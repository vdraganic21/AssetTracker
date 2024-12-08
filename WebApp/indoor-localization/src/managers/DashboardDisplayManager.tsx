class DashboardDisplayManager {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private image: HTMLImageElement;
  private offset: { x: number; y: number };
  private dragging: boolean;
  private startPosition: { x: number; y: number };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
    this.image = new Image();
    this.offset = { x: 0, y: 0 };
    this.dragging = false;
    this.startPosition = { x: 0, y: 0 };
    this.image.src = "/floorMapDemo.png"; // TODO remove demo floor map image
    this.image.onload = this.handleImageLoad.bind(this);
    this.setupEventListeners();
    this.setupResizeListener();
  }

  private handleImageLoad() {
    this.updateCanvasSize();
    this.draw();
  }

  private updateCanvasSize() {
    if (this.canvas.parentElement) {
      this.canvas.width = this.canvas.parentElement.offsetWidth;
      this.canvas.height = this.canvas.parentElement.offsetHeight;
    }
  }

  private draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const scale = Math.min(
      this.canvas.width / this.image.width,
      this.canvas.height / this.image.height
    );
    const scaledWidth = this.image.width * scale;
    const scaledHeight = this.image.height * scale;
    const x = this.offset.x + (this.canvas.width - scaledWidth) / 2;
    const y = this.offset.y + (this.canvas.height - scaledHeight) / 2;
    this.context.drawImage(this.image, x, y, scaledWidth, scaledHeight);
  }

  private setupEventListeners() {
    this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
    this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
    this.canvas.addEventListener("mouseleave", this.handleMouseUp.bind(this));
  }

  private handleMouseDown(event: MouseEvent) {
    this.dragging = true;
    this.startPosition = { x: event.clientX, y: event.clientY };
  }

  private handleMouseMove(event: MouseEvent) {
    if (!this.dragging) return;
    const dx = event.clientX - this.startPosition.x;
    const dy = event.clientY - this.startPosition.y;
    this.offset = { x: this.offset.x + dx, y: this.offset.y + dy };
    this.startPosition = { x: event.clientX, y: event.clientY };
    this.draw();
  }

  private handleMouseUp() {
    this.dragging = false;
  }

  private setupResizeListener() {
    window.addEventListener("resize", () => {
      this.updateCanvasSize();
      this.draw();
    });
  }

  public destroy() {
    this.canvas.removeEventListener("mousedown", this.handleMouseDown);
    this.canvas.removeEventListener("mousemove", this.handleMouseMove);
    this.canvas.removeEventListener("mouseup", this.handleMouseUp);
    this.canvas.removeEventListener("mouseleave", this.handleMouseUp);
  }
}

export default DashboardDisplayManager;
