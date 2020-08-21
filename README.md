# webgme-plotly
This repository contains implementations for visualizing [plotly](https://plotly.com/javascript/) JSON in [webgme
](https://github.com/webgme/webgme). 
## Installation
First, install `webgme-plotly` to your webgme project using `npm`:
```sh
$ npm install webgme-plotly
```
After installation use  [webgme-cli](https://github.com/webgme/webgme-cli) to import `PlotlyGraph` panel to your project:

```sh
$ webgme import viz PlotlyGraph webgme-plotly
``` 

After import, `PlotlyGraph` will be available as a visualizer.

### Usage
Checkout the following [seed](./src/seeds/testProject.webgmex), load it as a project and select `PlotlyGraph` panel
 for the sampleGraph node as shown in the figure below
 
![sample-image](./images/sample.png)
 
### Customization
To use it in your own visualizer to visualize plotly JSON from your project nodes, use the following customization
 panel parameters. 
```
params = {
    plotlyDataAttribute: The active node attribute which stores plotly JSON
    embedded: If true, the visualizer will expect a parent visualizer to call "selectedObjectChanged". If false, it will subscribe to WebGME events.
}
```
 
 ```javascript
PlotlyGraphPanel.apply(
    this,
    [layoutManager, params]
);
```
 
