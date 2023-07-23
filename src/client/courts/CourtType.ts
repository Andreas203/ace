abstract class CourtType{
    public static courtWidth: number = 1000;
    public static courtHeight: number = 500;
    public courtColor!: number |  0x00ff00;
    public speed!: number | 1;
}

class HardCourt extends CourtType {
    public static courtColor: number = 0x0000FF;
    public speed: number = 1.2;
}

class ClayCourt extends CourtType {
    public static courtColor: number = 0x000000;
    public speed: number = 1.2;
}

class GrassCourt extends CourtType {
    public static courtColor: number = 0x000000;
    public speed: number = 1.2;
}

export { CourtType, HardCourt, ClayCourt, GrassCourt };