# webgme-plotly
This repository contains components for visualizing [plotly](https://plotly.com/javascript/) JSON in [webgme
](https://github.com/webgme/webgme). 
## Quick start
Use [webgme-cli](https://github.com/webgme/webgme-cli) to import `PlotlyGraph` panel to your webgme app:

```sh
$ webgme import viz PlotlyGraph webgme-plotly
``` 

After import, `PlotlyGraph` will be available as a visualizer in your project. An example can be found
 in [deepforge](https://github.com/deepforge-dev/deepforge).

## Examples
This repository is a functioning example of the `PlotlyGraph`. First, make sure you have an instance of mongo
 running locally. Then, simply clone this repository and run it.

```sh
git clone https://github.com/deepforge-dev/webgme-plotly.git
cd webgme-plotly
npm install
npm start
```
Then, navigate to `http://localhost:8888`, select the following [seed](./src/seeds/testProject.webgmex), load it as a
 project and select `PlotlyGraph` panel for the sampleGraph node as shown in the figure below: 
 
![sample-image](./images/sample.png)
 
## Customization
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
 
