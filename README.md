# GL200-generator-NW.js [![Build Status](https://travis-ci.org/3LA-dev/GL200-generator-NW.js.svg)](https://travis-ci.org/3LA-dev/GL200-generator-NW.js)
GL200 frames generator GUI in NW.js (node-webkit)

This application can connect to a TCP server and send frames general position reports GL200 

- +RESP:GTPNA Report on the device.
- +RESP:GTSOS Report SOS button.
- +RESP:GTSPD Report speed out of range and within range.
- +RESP:GTGEO Reporte Geo-Fence.
- +RESP:GTNMR Report motion sensor.
- +RESP:GTFRI Report position.

The program allows you to set all the data involved in the generation of the frames of the reports, in addition to any other frame insert and send in your console section.

> This application is based in the **Track Air Interface Protocol Revision: 1.13**
