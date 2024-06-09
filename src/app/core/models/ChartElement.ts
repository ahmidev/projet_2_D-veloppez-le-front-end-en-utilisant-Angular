interface Point {
    x: number;
    y: number;
  }
  
  interface Size {
    height: number;
    width: number;
  }
  
  interface LabelRect {
    x: number;
    y: number;
    width: number;
    height: number;
  }
  
  interface Offset {
    x: number;
    y: number;
  }
  
  interface Style {
    backgroundColor: string;
    borderColor: string;
    borderRadius: number;
    borderWidth: number;
    lineWidth: number;
  }
  
  interface OutLabel {
    center: Point & { d: number; arc: object; anchor: object };
    computeLabelRect: () => any;
    computeTextRect: () => any;
    containsPoint: (point: Point, offset: Offset) => boolean;
    ctx: CanvasRenderingContext2D;
    draw: () => any;
    drawLabel: () => any;
    drawLine: () => any;
    drawText: () => any;
    encodedText: string;
    getPoints: () => any[];
    init: (text: string, lines: string[]) => any;
    label: string;
    labelRect: LabelRect;
    lines: string[];
    moveLabelToOffset: () => any;
    offset: Offset;
    offsetStep: number;
    predictedOffset: Offset;
    size: Size;
    stretch: number;
    style: Style;
    text: string;
    textRect: LabelRect;
    update: (view: object, elements: any[], max: number) => any;
    value: number;
  }
  
export   interface ChartElement {
    $outlabels: OutLabel;
    hidden: boolean;
    _chart: Chart;
    $plugins: { descriptors: any[]; id: number };
    active: any[];
    length: number;
    animating: boolean;
    aspectRatio: number;
    borderWidth: number;
    boxes: ChartElement[];
    canvas: HTMLCanvasElement;
    chart: Chart;
    chartArea: { left: number; top: number; right: number; bottom: number };
    config: { type: string; data: object; plugins: any; options: object };
    controller: Chart;
    ctx: CanvasRenderingContext2D;
    currentDevicePixelRatio: number;
    height: number;
    id: number;
    innerRadius: number;
    lastActive: any[];
    offsetX: number;
    offsetY: number;
    options: object;
    outerRadius: number;
    radiusLength: number;
    scales: object;
    sizeChanged: boolean;
    titleBlock: ChartElement;
    tooltip: ChartElement;
    width: number;
    _bufferedRender: boolean;
    _bufferedRequest: any;
    _layers: any[];
    _listeners: { [key: string]: Function };
    data: any;
    _datasetIndex: number;
    _index: number;
    _model: object;
    _options: object;
    _start: any;
    _view: object;
  }
  