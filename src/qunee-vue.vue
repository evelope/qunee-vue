<template>
  <div ref="canvas" style="height: 500px;"></div>
</template>

<script>
import "./qunee.min.js";
export default {
  name: "qunee-vue",
  mounted() {
    let getI18NString = null;
    if (!window.getI18NString) {
      getI18NString = function(s) {
        return s;
      };
    }
    function HFlexEdgeUI(edge, graph) {
      Q.doSuperConstructor(this, HFlexEdgeUI, arguments);
    }
    HFlexEdgeUI.prototype = {
      drawEdge: function(path, fromUI, toUI, edgeType, fromBounds, toBounds) {
        var from = fromBounds.center;
        var to = toBounds.center;
        var cx = (from.x + to.x) / 2;
        var cy = (from.y + to.y) / 2;
        //        path.curveTo(from.x, cy, cx, to.y);
        path.quadTo(cx, to.y + 0.1);
      }
    };

    Q.extend(HFlexEdgeUI, Q.EdgeUI);
    window.HFlexEdgeUI = HFlexEdgeUI;

    // 去除水印
    var id = setTimeout(() => {
      id = null;
      var qcanvas = this.$refs.canvas.querySelectorAll("div")[1];
      qcanvas.style.display = "none";
    });
    var graph = new Q.Graph(this.$refs.canvas);
    console.log(this.$refs.canvas, graph);

    graph.onclick = function(evt) {
      Q.log(evt.getData(), "data");
    };
    // 设置可编辑
    // graph.editable = true;
    graph.enableDoubleClickToOverview = false;
    // 禁止编辑
    graph.isMovable = function(item) {
      return false;
    };

    function createEdge(name, from, to) {
      var edge = null;
      edge = graph.createEdge(name, from, to);

      // 设置箭头 样式
      if (from.data.type == "reverse") {
        edge.setStyle(Q.Styles.ARROW_FROM, Q.Consts.SHAPE_TRIANGLE);
        edge.setStyle(Q.Styles.ARROW_FROM_SIZE, 5);
        edge.setStyle(Q.Styles.ARROW_FROM_STROKE, 1);
        edge.setStyle(Q.Styles.ARROW_TO, null);
      } else {
        edge.setStyle(Q.Styles.ARROW_TO, Q.Consts.SHAPE_TRIANGLE);
        edge.setStyle(Q.Styles.ARROW_TO_SIZE, 5);
        edge.setStyle(Q.Styles.ARROW_TO_STROKE, 1);
      }

      if (from.data.color) {
        edge.setStyle(Q.Styles.ARROW_TO_FILL_COLOR, from.data.color);
        edge.setStyle(Q.Styles.ARROW_FROM_FILL_COLOR, from.data.color);
        edge.setStyle(Q.Styles.EDGE_COLOR, from.data.color);
      } else {
        edge.setStyle(Q.Styles.ARROW_TO_FILL_COLOR, "#0099ff");
        edge.setStyle(Q.Styles.ARROW_FROM_FILL_COLOR, from.data.color);
        edge.setStyle(Q.Styles.EDGE_COLOR, "#0099ff");
      }

      // 设置箭头线弯曲
      edge.uiClass = HFlexEdgeUI;
    }

    function createText(text, data) {
      var node = graph.createNode(text, data);
      console.log(data.img);
      if (data.img) {
        node.image = data.img;
      } else {
        node.image = null;
      }

      // node.setStyle(Q.Styles.LABEL_BACKGROUND_COLOR, "#2898E0");
      // 背景颜色
      node.setStyle(
        Q.Styles.LABEL_BACKGROUND_GRADIENT,
        new Q.Gradient(
          Q.Consts.GRADIENT_TYPE_LINEAR,
          ["#fff", "#e4e4e4"],
          null,
          Math.PI / 2
        )
      );
      // 文字颜色
      node.setStyle(Q.Styles.LABEL_COLOR, "#333");
      // padding
      node.setStyle(Q.Styles.LABEL_PADDING, new Q.Insets(5, 10));
      node.setStyle(Q.Styles.LABEL_ANCHOR_POSITION, Q.Position.CENTER_MIDDLE);
      // border-width
      node.setStyle(Q.Styles.LABEL_BORDER, 2);
      // border-color
      if (data.color) {
        node.setStyle(Q.Styles.LABEL_BORDER_STYLE, data.color);
      } else {
        node.setStyle(Q.Styles.LABEL_BORDER_STYLE, "#1D4876");
      }
      if (data.line) {
        node.setStyle(Q.Styles.LABEL_BORDER, 1);
        node.setStyle(Q.Styles.LABEL_BORDER_STYLE, "transparent");
        // node.setStyle(Q.Styles.LABEL_BACKGROUND_GRADIENT, new Q.Gradient(Q.Consts.GRADIENT_TYPE_LINEAR, ['transparent', 'transparent'], null, Math.PI / 2));
      }
      // 选中之后效果
      // node.setStyle(Q.Styles.SELECTION_COLOR, "#0F0");
      node.setStyle(Q.Styles.SELECTION_SHADOW_BLUR, 10);
      node.setStyle(Q.Styles.SELECTION_COLOR, "#8F8");
      node.setStyle(Q.Styles.SELECTION_SHADOW_OFFSET_X, 2);
      node.setStyle(Q.Styles.SELECTION_SHADOW_OFFSET_Y, 2);

      return node;
    }

    function localToGlobal(x, y, canvas) {
      x += window.pageXOffset;
      y += window.pageYOffset;
      var clientRect = canvas.getBoundingClientRect();
      return { x: x + clientRect.left, y: y + clientRect.top };
    }

    var layouter = new Q.TreeLayouter(graph);
    layouter.isLayoutable = function(node, from) {
      return node == ROOT || node.host != null;
    };
    layouter.vGap = 20;

    var datas = {
      name: "O1:努力建设集团企业***",
      parentChildrenDirection: Q.Consts.DIRECTION_MIDDLE,
      layoutType: Q.Consts.LAYOUT_TYPE_TWO_SIDE,
      children: [
        { name: "O1:努力建设集团企业***" },
        {
          name: "KR2:巴拉巴拉巴拉巴拉11",
          type: "reverse",
          color: "#ff9900",
          line: true
        },
        {
          name: "KR1:巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴",
          children: [
            {
              name: "KR2:巴拉巴拉巴拉巴拉22",
              // img: "../../wgf-vue/public/img/icons/apple-touch-icon-60x60.png",
              type: "reverse"
            }
          ]
        },
        { name: "KR2:巴拉巴拉巴拉巴拉33" },
        {
          name: "KR2:巴拉巴拉巴拉巴拉66",
          type: "reverse",
          color: "#ff9900",
          line: true
        },
        { name: "KR2:巴拉巴拉巴拉巴拉44" }
      ]
    };

    function createItem(data, parent, level) {
      if (Q.isArray(data)) {
        var children = data;
        for (var i = 0, l = children.length; i < l; i++) {
          var child = children[i];
          createItem(child, parent, level);
        }
        return;
      }
      var node = createText(data.name, data);
      node.tooltipType = "text";
      node.data = data;
      level = level || 0;
      node.level = level;
      if (parent) {
        linkToParent(node, parent);
      }
      node.parentChildrenDirection = data.parentChildrenDirection;
      node.layoutType = data.layoutType;

      if (data.children) {
        createItem(data.children, node, level + 1);
      }
      return node;
    }

    function linkToParent(node, parent) {
      node.host = parent;
      return createEdge(parent, node);
    }
    function unlinkToParent(node) {
      node.host = null;
      node.forEachInEdge(function(edge) {
        graph.graphModel.remove(edge);
      });
    }

    var ROOT = createItem(datas);

    // 设置基础元素
    // ROOT.setStyle(Q.Styles.LABEL_FONT_SIZE, 20);
    // ROOT.setStyle(Q.Styles.LABEL_SIZE, new Q.Size(80, 60));
    // border-width
    ROOT.setStyle(Q.Styles.LABEL_BORDER, 2);
    // border-color
    ROOT.setStyle(Q.Styles.LABEL_BORDER_STYLE, "#0099ff");

    graph.callLater(function() {
      layouter.doLayout();
      graph.zoomToOverview();
    });
  }
};
</script>

<style>
</style>
