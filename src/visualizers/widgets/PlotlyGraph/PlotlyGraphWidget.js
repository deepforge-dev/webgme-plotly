/*globals define, _, $*/
define([
    'webgme-plotly/plotly.min'
], function (
    Plotly
) {

    'use strict';

    const WIDGET_CLASS = 'plotly-graph';
    const PLOT_BG_COLOR = '#EEEEEE';

    function PlotlyGraphWidget(logger, container) {
        this.logger = logger.fork('widget');
        this._container = container;
        this.$el = container;
        this.$defaultTextDiv = $('<div>', {
            class: 'h2 center'
        }).text('No Data Available.')
            .css({
                'margin-top': this.$el.height() / 2
            });
        this.$el.append(this.$defaultTextDiv);
        this.$el.css('overflow', 'auto');
        this.$el.addClass(WIDGET_CLASS);
        this.plots = [];
        this.logger.debug('ctor finished');
        this.setTextVisibility(true);
    }

    PlotlyGraphWidget.prototype.onWidgetContainerResize = function (width, height) {
        // Nothing needs to be done here since the chart is already responsive
        this.$el.css({
            width: width,
            height: height
        });
        this.$defaultTextDiv.css({
            'margin-top': height / 2
        });
        this.logger.debug('Widget is resizing...');
    };

    // Adding/Removing/Updating items
    PlotlyGraphWidget.prototype.addNode = function (desc) {
        this.addOrUpdateNode(desc);
    };

    PlotlyGraphWidget.prototype.removeNode = function () {
        this.refreshChart();
        this.setTextVisibility(true);
    };

    PlotlyGraphWidget.prototype.addOrUpdateNode = function (desc) {
        if (desc) {
            const plotlyJSONs = Array.isArray(desc) ?
                desc.map(descr => descr.plotlyData) : [desc.plotlyData];
            this.setTextVisibility(false);
            this.refreshChart(plotlyJSONs);
        }
    };

    PlotlyGraphWidget.prototype.updateNode = function (desc) {
        this.deleteChart();
        this.addOrUpdateNode(desc);
    };

    PlotlyGraphWidget.prototype.createOrUpdateChart = function (plotlyJSONs) {
        if (!plotlyJSONs) {
            this.deleteChart();
        } else {
            this.createChartSlider(plotlyJSONs);
        }
    };

    PlotlyGraphWidget.prototype.createChartSlider = function(plotlyJSONs) {
        const len = plotlyJSONs.length;
        plotlyJSONs.forEach(json => {
            const plotlyDiv = $('<div/>');

            if (len === 1) {
                json.layout.height = this.$el.height();
                json.layout.width = this.$el.width();
            } else {
                json.layout.autosize = true;
                delete json.layout.width;
                delete json.layout.height;
            }
            json.layout.plot_bgcolor = PLOT_BG_COLOR;
            json.layout.paper_bgcolor = PLOT_BG_COLOR;

            const icon1 = {
                'width': 500,
                'height': 600,
                'path': 'M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z'
            };
            json.config = {
                modeBarButtonsToAdd: [
                  {
                    name: 'save camera',
                    icon: icon1,
                    click: function(gd) {
                      var scene = gd._fullLayout.scene._scene;
                      const layout = {};
                      scene.saveLayout(layout);
                      localStorage['camera'] = JSON.stringify(layout.scene);
                    }
                  },
                  {
                    name: 'reset camera',
                    icon: icon1,
                    click: function(gd) {
                      var scene = gd._fullLayout.scene._scene;
                      if (localStorage['camera']) {
                          const cameraView = JSON.parse(localStorage['camera']);
                          scene.setViewport(cameraView);
                      }
                    }
                  } 
                ],
                modeBarButtonsToRemove: ['pan2d','select2d','lasso2d','resetScale2d','zoomOut2d']
            };
            Plotly.newPlot(plotlyDiv[0], json);
            this.plots.push(plotlyDiv);
            this.$el.append(plotlyDiv);
        });
    };

    PlotlyGraphWidget.prototype.refreshChart = _.debounce(PlotlyGraphWidget.prototype.createOrUpdateChart, 50);

    PlotlyGraphWidget.prototype.deleteChart = function () {
        this.plots.forEach($plot => {
            Plotly.purge($plot[0]);
            $plot.remove();
        });
    };

    PlotlyGraphWidget.prototype.setTextVisibility = function (display) {
        display = display ? 'block' : 'none';
        this.$defaultTextDiv.css('display', display);
    };
    /* * * * * * * * Visualizer life cycle callbacks * * * * * * * */
    PlotlyGraphWidget.prototype.destroy = function () {
        this.deleteChart();
    };

    PlotlyGraphWidget.prototype.onActivate = function () {
        this.logger.debug('PlotlyGraphWidget has been activated');
    };

    PlotlyGraphWidget.prototype.onDeactivate = function () {
        this.logger.debug('PlotlyGraphWidget has been deactivated');
    };

    return PlotlyGraphWidget;
});
