# Flykeys simulator

The Flykeys simulator was designed to reproduce the behavior of the Flykeys object (learning mode only).

# How it works

The simulator reads the file in input and shows exactly what the Flykeys object would show with this same file as input.
![simulator](https://github.com/clementh59/flykeys-simulator/blob/master/res/simulator.png)

The color of each note matches exactly what the object would show. So a green note means that the note has to be played with the right hand and a blue one has to be played with the left hand.
A white note means that the right hand has to release the key and push it again and an orange one has the same signification but for the right hand.

# How to run 

Go in the root of the project and run:
- `npm run start`

Alternatively, you can go to the hosted version [here](https://flykeys-simulator.netlify.app).

Then, select a Flykeys file. You can find an example in the `example` folder.

Once you selected a file, you'll be able to run the simulator. Just click on play to run it.

You can also update the speed of the music by using the appropriate slider.

## Go directly at a given tick

A 'move' function has been exported to be able to go at the tick you want. You can use it in the console of your browser. 

For example, if you want to go at tick 400, enter this in the console:
```js
setTick(400)
```