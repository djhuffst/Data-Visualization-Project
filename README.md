# Brian-Celine-Daniel
# Arizona Data by County 
### Overview
![Thumbnail](/thumbnail.png)
 The goal of this project is to use different elements learned throughout the course to showcase our data. We wanted to make the information easy to interpret, creative, and allow users to interact with the data. Our project visualizes age demographics for counties in Arizona over a ten year span. We used three separate techniques for visualizing the data and linked them all through county selection on the map. First we have a map of the state of Arizona separated into counties, a bar chart representing the age distribution for the selected county, and lastly, a unique interactive visualization that shows the average population of different age groups over the ten year span in the data. 
The project was designed using a combination of languages including d3.javascript, CSS, and html.  Each visualization is contained with it’s own svg and created using d3 library functions. Components of the page were styled creating classes using CSS. Lastly, html is used for structuring the components of the page. 

### Data Description
The data used for the project was downloaded from https://www2.census.gov/programs-surveys/popest/tables/2010-2019/state/detail/sc-est2019-agesex-04.xlsx.  The file format is csv and contains ten years worth of information for each county in Arizona. The dataset is relatively small with less that two hundred lines of information.  Each line includes the county, year, and over twenty different attributes related to age and sex. We used fourteen of those attributes, which were all related to age.  The data for the bar chart was not preprocessed but gets filtered at runtime. We used a modified version of the original dataset that for the innovative visualization that simply held only information relative to calculating the averages.
 
### Goals and Tasks
The goal of this visualization is to create a visually appealing representation of the demographics of Arizona. We decided to use a simple dataset because we wanted to demonstrate how innovative data visualization is when using the javascript library D3. In addition to this, we wanted the data to convey that Arizona's population is concentrated mostly in Maricopa county. Also the data visulization displays that Arizona is a growing state because the majority of the population consist of younger people. 

### Idioms
Our team built an interactive dashboard about Arizona’s demographic data from the years of 2009 to 2020. On the left of the index page, it contains a visualization of Arizona, which is partitioned into counties. Then, on the right, we created a bar chart that displays the distribution of ages within the selected county on the map. At the bottom, we implemented a circle packing diagram that displays the average population size for each age group by county, each circle packing diagram represents a different county. In addition to this, we added a drop down widget that changes the bar chart based on the year the user selects. The other widget we added was the color scale radio buttons that changes the colors on the map of Arizona and bar chart. The map of Arizona and the bar chart are linked, so when a county is selected on the map, the bar chart is altered to fit the selection. 
To implement our innovative visualization, we used a force-directed graph layout algorithm. This algorithm calculates the position of each node by stimulating an attractive and repulsive force between each pair of linked nodes. The colliding radius had to be altered for each of the counties because each county’s radius was different because of the population averages.

*Image 1: Bar chart that interacts with the county selected on map and the year change widget*
![barchart](/barchart.png) 

*Image 2: The map and bar chart changing colors based on radio buttons*

![color](/colorScale.png) 

*Image 3: Circle packing chart organized by county that displays average population size by age group*
![circle](/CircleChart.png)


### Reflection
In our original proposal our design was going to be more less a dashboard showcasing the data with a  map, a bar chart, and a tree map for our innovative design. In the end there is still a little bit of a dashboard feel with an artistic touch added in. We were given feedback that a treemap alone was not considered enough to make it innovative so we decided to update to circle packing for the WIP assignment. Again we were told that was not innovative enough on its own. So finally in the final design we created an interactive bubble chart where the user can drag bubbles around the svg. 
Even after both changes, the final project didn’t change too much from our original proposal. We were able to implement the first two visualizations as proposed. Our original design plans were realistic since they mostly met all the requirements and could be completed within the time allotted. The biggest challenge we faced was finding an innovative design. Instead of trying to be creative, we were just choosing visualizations that we hadn’t used in class. We wanted to have the bubbles include text or some sort of identifier as to what the data meant. This was difficult to do based on how we implemented the design. Instead we created a color coated legend to represent the data. Next we would probably spend more time finding a little more interesting topic. I think we could have made something a little more creative had we chosen a more interesting subject. 

### Team Workload
Brian:
* Brainstormed idea for project proposal
* Created the bar chart and interactions 
* Helped with innovative visualization 
* Created the widgets: drop-down and radio buttons
* Helped write the project proposal, WIP, and final document

Dan: 
* Sourced the data file and the geojson file for building the map.
* Brainstormed idea for project proposal.
* Created the map svg including the tooltips.
* Helped with innovative visualization.
* Helped write the project proposal, WIP, and final document.

Celine:
* Brainstormed idea for project proposal
* Created the innovative visualization: circle packing grouped chart
* Helped with creating the radio button widgets
* Helped write the project proposal, WIP, and final document


