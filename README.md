# Pytorch Stock RNN

This project's goal was to make predictions for stock closing prices using a Recurrent Neural Network and `Pytorch`. Afterwards, this project was deployed to Flask and linked with a React App

**Note: You can view the project [here](https://rnn-stock-predictor.herokuapp.com) on Heroku, but it still has some server-side issues**

![thumbnail](./demo/thumbnail.PNG)

<br />

## Getting Started

To get this project running on your machine, follow the instructions below

### Jupyter Notebook

To make changes to the Jupyter Notebook, you will need to install [Pytorch](https://pytorch.org). You can find more in-depth instructions on how to do so [here](https://deeplizard.com/learn/video/UWlFM0R_x6I)

Alternatively, you can simply view the results of the Jupyter Notebook [here](https://jovian.ai/nishantbalepur/stock-predictions)

### Flask Web App

Before you are able to run the web server, you will need to install `Python` and `Flask`. Instructions on how to set up `Flask` with `VS Code` can be found [here](https://code.visualstudio.com/docs/python/tutorial-flask)

Now, run the following command to get the files on your machine

```
git clone https://github.com/nbalepur/Python-Stock-RNN.git
```

Navigate to `./Pytorch-Stock-RNN/`, and run the following command:

```
flask run
```

This will open up the website in locally in your default browser

<br />
<br />

## Website Features

### Input Checking

If an invalid input is typed for the stock ticker symbol, the website will alert you with one of the following messages:

<br />

#### Empty Input Error

![empty](./demo/nonempty.PNG)

#### Non-Alphabetical Input Error

![nonalpha](./demo/alphabetical.PNG)

<br />

### Invalid Stock

If your stock symbol is mispelled or doesn't exist, the website will let you know:

![invalid stock](./demo/invalidstock.PNG)

<br />

### API Overusage

If the API from [Alpha Vantage](https://www.alphavantage.co) is overrused, you will be alerted, shown below:

![alpha vantage](./demo/alphavantage.PNG)

Once the timer is up, you are free to make API calls once again

<br />

### Loss Visualization

Once a valid input has been selected, you can view the loss development of the neural network under `Loss Visualization`. A sample loss visualization for `TSLA` can be seen below:

![loss](./demo/loss.PNG)

<br />

### Training and Testing Sets

Under this tab, you can see the model's predictions on the training and testing sets. An example of this for `TSLA` can be seen below:

![traintest](./demo/traintest.PNG)

<br />

### Future Predictions

You can also see future short-term predictions for the chosen stock. Below is a visualization of the future predictions for `TSLA`:

![future](./demo/future.PNG)

<br />
<br />

## Demo
