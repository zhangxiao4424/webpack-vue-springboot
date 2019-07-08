<template>
    <!-- <h1>hello world</h1>     -->
    <div id="mxgraph1">
        <div class="top"></div>
        <div class="bottom">
            <div class="right">
                <!-- <div class="element-img" v-for="item in items" :key="item">{{item}}</div> -->
                <ul
                    class="elements">
                    <li
                    class="element"
                    v-for="item in items"
                    :key="item.id">
                    <img
                        v-bind="item"
                        class="element-img"
                        :src="`/static/images/${item.icon}`">
                    <!-- <p>{{ element.title }}</p> -->
                    </li>
                </ul>
            </div>
            <div class="iscanvas" ref="graph_container"></div>
            <div class="left">
                <lineStyle v-if="this.selectEdgeStyle" 
                    :selectEdgeStyle = selectEdgeStyle
                    :handleStyleChange = handleStyleChange>
                </lineStyle>
                <div v-if="this.selectSwitch">
                    <select>
                        <option value ="volvo">Volvo</option>
                        <option value ="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="outline-wrapper">
            <h4>导航器</h4>
            <div id="graphOutline"/>
        </div>
    </div>
</template>
<script>
import mxgraph from '../graph/index';
import lineStyle from '../components/lineStyle'

const {
  mxGraph,
  mxOutline,
  mxEvent,
  mxCell,
  mxGeometry,
  mxUtils,
  mxEventObject,
  mxConnectionHandler,
  mxPoint,
  mxRubberband,
  mxConnectionConstraint,
  mxEdgeHandler,
  mxCellState,
  mxGraphHandler,
  mxConstants,
  mxEdgeStyle,
  mxPerimeter 
} = mxgraph;

export default {

    name: 'HelloWorld',
    props: {
        msg: String
    },
    components: {
        lineStyle
    },
    data() {
        return {
            selectSwitch: false,
            isOpen: true,
            pipeline: [],
            selectEdge: {},
            items: [
                {
                    id: 1,
                    icon: 'actor.gif'
                },
                {
                    id: 2,
                    icon: 'cylinder.gif'
                },
                {
                    id: 3,
                    icon: 'ellipse.gif'
                },
                {
                    id: 4,
                    icon: 'rectangle.gif'
                },
                {
                    id: 5,
                    icon: 'rhombus.gif'
                },
                {
                    id: 6,
                    icon: 'triangle.gif'
                },
                {
                    id: 7,
                    icon: 'valve.gif'
                }
            ]
        }
    },
    mounted() {
        this.initMxGraph();
        this.addListener();
        this.makeDraggable(document.getElementsByClassName('element-img'));
        this.cerateTank();
        this.canDrop();
    },
    methods: {
        makeDraggable(sourceEles) {
            const createPopupMenu = (graph, menu, cell, evt) => {
                if (cell != null) {
                    let state = menu.graph.view.getState(cell);
                    let isClose = state.shape.node.getElementsByTagName('image')[0].getAttribute('isOpen') === 'true' ? true : false;
                    menu.addItem(isClose? 'open': 'close', '', () => {
                        // mxUtils.alert('MenuItem1');
                        // dom.setAttribute('src', '');
                        state.shape.node.getElementsByTagName('image')[0].setAttribute('href', `/static/images/${isClose? 'valve_open': 'valve_close'}.svg`);
                        state.shape.node.getElementsByTagName('image')[0].setAttribute('isOpen', isClose? 'false' :'true');
                    });
                }
                menu.addSeparator();
            };
            const createValve = (dom, x, y) => {
                let doc = mxUtils.createXmlDocument();
                let valve = doc.createElement('valve');
                // let style = this.graph.getStylesheet().getDefaultVertexStyle();
                // console.log(mxConstants.DIALECT_SVG);
                
                // style[mxConstants.DIALECT_SVG] = `/static/images/valve.svg`;
                let style = new Object();
                style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
                style[mxConstants.STYLE_IMAGE] = '/static/images/valve_open.svg';
                style[mxConstants.STYLE_FONTCOLOR] = '#FFFFFF';
                this.graph.getStylesheet().putCellStyle('image', style);
                this.graph.popupMenuHandler.factoryMethod = (menu, cell, evt) => {
                    // console.log(cell);
                    if (cell && cell.style === 'image') {
                        // console.log(cell.id);
                        return createPopupMenu(this.graph, menu, cell, evt, dom);
                    }
				};
                this.graph.getModel().beginUpdate();
                try{
					let v1 = this.graph.insertVertex(this.graph.getDefaultParent(), null, '', x, y, 30, 30, 'image');
				}
				finally{
					// Updates the display
					this.graph.getModel().endUpdate();
				}
            };
            const initConnection = (_graph) => {
                _graph.setConnectable(true);
                // if (_graph.connectionHandler.connectImage == null) {
				// 	_graph.connectionHandler.isConnectableCell = function(cell) {
				// 	   return false;
				// 	};
				// 	mxEdgeHandler.prototype.isConnectableCell = function(cell) {
				// 		return _graph.connectionHandler.isConnectableCell(cell);
				// 	};
				// }
                // _graph.getAllConnectionConstraints = function(terminal) {
				// 	if (terminal != null && this.model.isVertex(terminal.cell)) {
				// 		return [new mxConnectionConstraint(new mxPoint(0, 0), true),
				// 	    	new mxConnectionConstraint(new mxPoint(0.5, 0), true),
				// 	    	new mxConnectionConstraint(new mxPoint(1, 0), true),
				// 	    	new mxConnectionConstraint(new mxPoint(0, 0.5), true),
				// 			new mxConnectionConstraint(new mxPoint(1, 0.5), true),
				// 			new mxConnectionConstraint(new mxPoint(0, 1), true),
				// 			new mxConnectionConstraint(new mxPoint(0.5, 1), true),
				// 			new mxConnectionConstraint(new mxPoint(1, 1), true)];
				// 	}
				// 	return null;
                // };
                var style = _graph.getStylesheet().getDefaultEdgeStyle();
                style[mxConstants.STYLE_ROUNDED] = true;
                style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
                _graph.alternateEdgeStyle = 'elbow=vertical';
                // Connect preview
				_graph.connectionHandler.createEdgeState = function(me) {
					var edge = _graph.createEdge(null, null, null, null, null, 'edgeStyle=orthogonalEdgeStyle');
					return new mxCellState(_graph.view, edge, _graph.getCellStyle(edge));
				};
            };
            const dropValidate = (evt) => {
                const x = mxEvent.getClientX(evt);
                const y = mxEvent.getClientY(evt);
                // 获取 x,y 所在的元素
                const elt = document.elementFromPoint(x, y);
                // 如果鼠标落在graph容器
                if (mxUtils.isAncestorNode(this.graph.container, elt)) {
                return this.graph;
                }
                // 鼠标落在其他地方
                return null;
            };
            // drop成功后新建一个节点
            const dropSuccessCb = function (_graph, evt, target, x, y) {
                let type = this.element.getAttribute('src').split('/')[this.element.getAttribute('src').split('/').length - 1].split('.')[0];
                let nodeRootVertex;
                if (type === 'valve') {
                    createValve(this.element, x, y);
                    // nodeRootVertex = new mxCell('鼠标双击输入', new mxGeometry(0, 0, 50, 50), `node;image=${this.element.getAttribute('src')}`);
                } else {
                    nodeRootVertex = new mxCell('鼠标双击输入', new mxGeometry(0, 0, 50, 50), `shape=${type};perimeter=ellipsePerimeter;`);
                     nodeRootVertex.vertex = true;
                    nodeRootVertex.geometry.x = x;
                    nodeRootVertex.geometry.y = y;
                    initConnection(_graph);
                    _graph.addCell(nodeRootVertex);
                    _graph.setSelectionCell(nodeRootVertex);
                }
            }; 

            Array.from(sourceEles).forEach((ele) => {
                const dragElt = document.createElement('div');
                dragElt.innerHTML  = ele.innerHTML;
                dragElt.setAttribute('style', 'width:120px;height:120px;color:red;');

                mxUtils.makeDraggable(ele, dropValidate, dropSuccessCb, dragElt,
                null, null, null, true);
            });
        },
        cerateTank() {
            this.graph.setHtmlLabels(true);

            // this.graph.isCellEditable = () => {
            //     return this.model.isEdge(cell);
            // };
            var parent = this.graph.getDefaultParent();
            var vertexStyle = 'shape=cylinder;strokeWidth=2;fillColor=#ffffff;strokeColor=#000000;' +
                    'gradientColor=#a0a0a0;fontColor=black;fontStyle=1;spacingTop=14;';
            let animationStart = (param) => {
                let state = this.graph.view.getState(param);
                state.shape.node.getElementsByTagName('path')[0].removeAttribute('visibility');
                state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke-width', '6');
                state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke', 'lightGray');
                state.shape.node.getElementsByTagName('path')[1].classList.add('flow');
                state.shape.node.getElementsByTagName('path')[1].classList.add('animation');
            };
            // Adds cells to the model in a single step
            this.graph.getModel().beginUpdate();
            let v1, v2, v3;
            try {
                // let v1 = this.graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
                // let v2 = this.graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);

                // let v3 = this.graph.insertVertex(parent, null, 'Test', 300, 0, 100, 100);
                // let v4 = this.graph.insertVertex(parent, null, 'Cum Caesar vidisset, portum plenum esse, iuxta navigavit.',
                // 400, 400, 100, 70, 'whiteSpace=wrap;')
                // let v5 = this.graph.insertVertex(parent, null, 'Cum Caesar vidisset, portum plenum esse, iuxta navigavit.',
                // 600, 540, 100, 70, 'whiteSpace=wrap;')
                // let e1 = this.graph.insertEdge(parent, null, 'Cum Caesar vidisset, portum plenum esse, iuxta navigavit.', v4, v5, 'whiteSpace=wrap;');
                // e1.geometry.width = 100;
                // this.graph.insertEdge(parent, null, '', v1, v2);
                // this.graph.insertEdge(parent, null, '', v1, v3);
                v1 = this.graph.insertVertex(parent, null, 'Pump', 300, 300, 60, 60, vertexStyle);
                v2 = this.graph.insertVertex(parent, null, 'tank1', 200, 150, 60, 60, vertexStyle);
                v3 = this.graph.insertVertex(parent, null, 'tank2', 400, 150, 60, 60, vertexStyle);

                var e1 = this.graph.insertEdge(parent, null, '',  v1, v2, 'strokeWidth=3;endArrow=none;endSize=2;endFill=1;strokeColor=red;rounded=1;isline');
                e1.geometry.points = [new mxPoint(100, 330), new mxPoint(100, 50), new mxPoint(230, 50)];
                var e2 = this.graph.insertEdge(parent, null, '',  v1, v3, 'strokeWidth=3;endArrow=none;endSize=2;endFill=1;strokeColor=blue;rounded=1;isline');
                e2.geometry.points = [new mxPoint(520, 330), new mxPoint(520, 50), new mxPoint(430, 50)];
                // this.graph.orderCells(true, [e]);
            } finally {
                // Updates the display
                this.graph.getModel().endUpdate();
            }

            window.setInterval(() => {
                this.graph.setCellWarning(v2, 'Tooltip');
            }, 5000);

            animationStart(e1);
            animationStart(e2);
            this.graph.model.addListener(mxEvent.CHANGE, function(sender, evt){
                animationStart(e1);
                animationStart(e2);
            });
            this.graph.view.addListener(mxEvent.SCALEANDTRANSLATE, function(sender, evt){
                animationStart(e1);
                animationStart(e2);
            });
        },
        handleStyleChange(key, value) {
            let state = this.graph.view.getState(this.selectEdge); 
            let styleDict = {};
            // console.log(this.selectEdge.getState());
            if (this.selectEdge.getStyle()) {
                this.selectEdge.getStyle().split(';').filter(item => item).forEach((item) => {
                    let [key, value] = item.split('=');
                    styleDict[key] = value;
                });
            }
            styleDict[key] = value;
            // if (styleDict['switch']) 
            let style = Object.entries(styleDict).map(([key, value]) => `${key}=${value}`).join(';').replace(/=undefined/g, '');
            this.graph.model.setStyle(this.selectEdge, style);
            if (key === 'switch') {
                state.shape.node.getElementsByTagName('path')[1].setAttribute('style', 'animation:none');
                // state.shape.node.getElementsByTagName('path')[1].classList.remove('animation');
            }        
        },
        handleSelectionChange(selectModel) {
            // this.selectVertex = {};
            this.selectEdge = {};
            this.selectSwitch = false;
            if (!selectModel.cells.length) {
                return;
            }
            
            let cell = selectModel.cells[0];
            if (!cell.vertex) {
                this.selectEdge = cell;
            } else {
                if (cell.style === 'image') {
                    this.selectSwitch = cell;
                    let cells = this.graph.model.cells;
                    console.log(cells);
                    for(let item in this.graph.model.cells) {
                        if (!cells[item].vertex) {  
                            let style = cells[item].style;
                            console.log(style);
                        }
                    }
                }
            }
        },
        canDrop() {
            mxEvent.addListener(this.$refs.graph_container, 'dragover', function(evt){
                if (this.graph.isEnabled()){
                    evt.stopPropagation();
                    evt.preventDefault();
                }
            });
        },
        initMxGraph() {
            // Enables guides
            mxGraphHandler.prototype.guidesEnabled = true;
            
            // Alt disables guides
            mxGraphHandler.prototype.useGuidesForEvent = function(me) {
                return !mxEvent.isAltDown(me.getEvent());
            };
            // Defines the guides to be red (default)
            mxConstants.GUIDE_COLOR = '#FF0000';
            // Defines the guides to be 1 pixel (default)
            mxConstants.GUIDE_STROKEWIDTH = 5;
            mxEdgeHandler.prototype.snapToTerminals = true;
            // Creates the graph inside the given container
            mxEvent.disableContextMenu(this.$refs.graph_container);
            this.graph = new mxGraph(this.$refs.graph_container);
            this.graph.setConnectable(true);
            this.graph.gridSize = 30;
            var outline = new mxOutline(this.graph, document.getElementById('graphOutline'));
            // Changes the default style for edges "in-place" and assigns
            // an alternate edge style which is applied in mxGraph.flip
            // when the user double clicks on the adjustment control point
            // of the edge. The ElbowConnector edge style switches to TopToBottom
            // if the horizontal style is true.
            var style = this.graph.getStylesheet().getDefaultEdgeStyle();
            style[mxConstants.STYLE_ROUNDED] = true;
            style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
            this.graph.alternateEdgeStyle = 'elbow=vertical';

            new mxRubberband(this.graph);
        },
        addListener() {
            const mxGraphSelectionModel = this.graph.getSelectionModel();
            mxGraphSelectionModel.addListener(mxEvent.CHANGE, this.handleSelectionChange);
        }
    },
    computed: {
        selectEdgeStyle() {
            if ( Object.keys(this.selectEdge).length > 0 ) {
                return this.graph.getCellStyle(this.selectEdge);
            }
            return false;
        }
    }
}
</script>
<style lang="scss">
    #mxgraph1 {
        .flow {
            stroke-dasharray: 8;
            // animation: dash 0.1s linear;
            // animation-iteration-count: infinite;
        }
        .animation{
            animation: dash 0.1s linear;
            animation-iteration-count: infinite;
        }
        @keyframes dash {
            to {
                stroke-dashoffset: -26;
            }
        }
        .top {
            width: 100%;
            height: 50px;
            background-color: #3C3C3C;
        }
        .bottom {
            width: 100%;
            height: calc(100vh - 50px);
            display: flex;
        }
        .right {
            width: 200px;
            height: 100%;
            // background-color: #252526;
            color: #fff;
        }
        .iscanvas {
            width: calc(100vw - 400px);
            height: 100%;
            overflow: hidden;
            background: url('../static/grid.gif') 0 0 repeat;
            cursor: default;
            touch-action: none;
        }
        .left {
            width: 200px;
            height: 100%;
            border-left: 1px solid #ccc;
        }
        .outline-wrapper {
            border: 1px solid #dedede;
            background: #fff;
            position: fixed;
            right: 262px;
            top: 66px;
            border-radius: 4px;
            z-index: 10;
        }
        h4 {
            padding: 6px;
            font-size: 12px;
            border-bottom: 1px solid #e6e6e6;
        }
        #graphOutline {
            width: 200px;
        }
        .elements {
            margin-top: 20px;
            // display: flex;
            // flex-wrap: wrap;
            // justify-content: space-between;
            li {
                padding:0;
                margin:0;
                list-style:none;
            }
            .element {
                width: 20px;
                height: 20px;
                text-align: center;
                margin-bottom: 10px;
                > img {
                border-radius: 4px;
                cursor: pointer;
                width: 20px;
                height: 20px;
                }
                > p {
                color: #333;
                margin-top: 8px;
                }
            }
        }
    }
</style>

