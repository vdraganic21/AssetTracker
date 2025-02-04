import { Asset } from "./Asset";
import { Zone } from "./Zone";

export class Facility {
    id: number;
    name: string;
    imageBase64: string;
    containedAssets: Asset[];
    containedZones: Zone[];

    constructor(id: number, name: string, imageBase64: string, containedAssets: Asset[] = [], containedZones: Zone[] = []) {
        this.id = id;
        this.name = name;
        this.imageBase64 = imageBase64;
        this.containedAssets = containedAssets;
        this.containedZones = containedZones;
    }
}