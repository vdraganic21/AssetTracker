export class Facility {
    id: number;
    name: string;
    imageBase64: string;
    containedAssetsIds: number[];
    containedZonesIds: number[];

    constructor(id: number, name: string, imageBase64: string, containedAssetsIds: number[] = [], containedZonesIds: number[] = []) {
        this.id = id;
        this.name = name;
        this.imageBase64 = imageBase64;
        this.containedAssetsIds = containedAssetsIds;
        this.containedZonesIds = containedZonesIds;
    }
}