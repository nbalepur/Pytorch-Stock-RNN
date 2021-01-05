from flask import Flask, request, session
from flask_cors import CORS

app = Flask(__name__, static_folder='./website/build', static_url_path='/')
CORS(app)

import torch
import torch.nn as nn
import requests
import pandas as pd
import numpy as np

from api_key import get_api_key

class GRU(nn.Module):
    def __init__(self, input_dim, hidden_dim, num_layers, output_dim):
        # call parent constructor
        super(GRU, self).__init__()
        
        # intialize variables
        self.hidden_dim = hidden_dim
        self.num_layers = num_layers
        
        # initialize neural network layers
        self.gru = nn.GRU(input_dim, hidden_dim, num_layers, batch_first = True)
        self.lin = nn.Linear(hidden_dim, output_dim)

    def forward(self, x):
        # calculate the hidden layer
        hidden_layer = torch.zeros(self.num_layers, x.size(0), self.hidden_dim).requires_grad_()
        
        # use the GRU network
        out, (hn) = self.gru(x, (hidden_layer.detach()))
        
        # predict with the Linear network
        return self.lin(out[:, -1, :]) 


@app.route('/')
def index():
    return app.send_static_file('index.html')


df = None
test_size = None
train_size = None
x_train = None
x_test = None
y_train = None
y_test = None
stock = None
close_data_raw = None

model = None
loss_vals = None

input_dim = None
hidden_dim = None
num_layers = None
output_dim = None
num_epochs = None
sample_size = None

optimizer = None
loss_func = None

epoch = None

@app.route("/data", methods = ["POST"])
def getData():

    global df
    global test_size
    global train_size
    global x_train
    global x_test
    global y_train
    global y_test
    global stock
    global close_data_raw

    global input_dim
    global hidden_dim
    global num_layers
    global output_dim
    global num_epochs
    global sample_size
    global model
    global optimizer
    global loss_func
    global loss_vals
    global epoch

    epoch = 0

    stock = request.json["stock"]

    # get the api key
    api_key = get_api_key()

    # get the response
    response = requests.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=" + 
                            stock + "&interval=15min&slice=year1month1&adjusted=true&apikey=" + api_key)

    # parse the text
    txt = response.text.split("\r\n")

    # error 1: too many api requests
    if txt == ['{\n    "Note": "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency."\n}']:
        return({"error_exists" : True, "error": "api"})

    data = [t.split(",") for t in txt]
    data.reverse()

    # error 2: ticker symbol doesn't exist
    if len(data) < 5: 
        return({"error_exists" : True, "error": "ticker"})
    

    # convert list of lists into pandas dataframe
    df = pd.DataFrame(data[1:-1])
    df.columns = data[-1]
    df_data = df[["open", "high", "low", "close", "volume"]].astype(float)

    # normalize data
    norm_df = (df_data - df_data.min()) / (df_data.max() - df_data.min())

    # define lookback
    lookback = 20

    # get the raw data and declare our input data
    close_data_raw = norm_df[["close"]].to_numpy()
    close_data = []

    # iterate through and add the appropriate points
    for index in range(len(close_data_raw) - lookback): 
        close_data.append(close_data_raw[index: index + lookback])

    # convert to a numpy array
    close_data = np.array(close_data)

    # calculate appropriate sizes
    test_size = int(np.round(0.2 * close_data.shape[0]))
    train_size = close_data.shape[0] - (test_size)

    # x value arrays
    x_train_arr = close_data[:train_size,:-1,:]
    x_test_arr = close_data[train_size:,:-1]

    # y value arrays
    y_test_arr = close_data[train_size:,-1,:]
    y_train_arr = close_data[:train_size,-1,:]

    # convert x values into torches
    x_train = torch.from_numpy(x_train_arr).type(torch.Tensor)
    x_test = torch.from_numpy(x_test_arr).type(torch.Tensor)

    # convert y values into torches
    y_train = torch.from_numpy(y_train_arr).type(torch.Tensor)
    y_test = torch.from_numpy(y_test_arr).type(torch.Tensor)

    # declare needed variables
    input_dim = 1
    hidden_dim = 32
    num_layers = 2
    output_dim = 1
    num_epochs = 100
    sample_size = train_size + test_size

    # create the model
    model = GRU(input_dim, hidden_dim, num_layers, output_dim)

    # choose the loss function
    loss_func = torch.nn.MSELoss(reduction = 'mean')

    # select an optimizer algorithm
    optimizer = torch.optim.Adam(model.parameters(), lr = 0.01)

    # declare needed variables
    loss_vals = np.zeros(num_epochs)

    return {"error_exists" : False}

@app.route("/train")
def trainNN():

    global df
    global test_size
    global train_size
    global x_train
    global x_test
    global y_train
    global y_test
    global stock
    global close_data_raw

    global model
    global loss_vals

    global input_dim
    global hidden_dim
    global num_layers
    global output_dim
    global num_epochs
    global sample_size
    global model
    global optimizer
    global loss_func

    global epoch


    # train the model
    for e in range(5):
        # predict with the model
        y_train_pred = model(x_train)
        
        # calculate the losd values
        loss = loss_func(y_train_pred, y_train)
        loss_vals[epoch] = loss.item()
        
        # adjust the model accordingly
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        epoch += 1

    return {"error_exists" : False}

@app.route("/predict")
def predict():

    global df
    global test_size
    global train_size
    global x_train
    global x_test
    global y_train
    global y_test
    global stock
    global close_data_raw

    global model
    global loss_vals

    # obtain the training data
    pred_train = model(x_train).detach().numpy()
    act_train = y_train.detach().numpy()

    # obtain the testing data
    pred_test = model(x_test).detach().numpy()
    act_test = y_test.detach().numpy()

    # obtain all of the data
    all_pred_vals = np.concatenate((pred_train, pred_test), 0)
    all_act_vals = np.concatenate((y_train, y_test), 0)

    # intialize variables
    future_preds = [close_data_raw[-1][0]]
    window = x_test[-1,:,:]
    num_intervals = 48

    # sliding window algorithm
    for i in range(num_intervals):
        # create a temporary window
        temp_window = torch.reshape(window, (1, 19, 1))
        
        # obtain our current prediction and append it to the list
        curr_pred_torch = model(temp_window)
        curr_pred = curr_pred_torch.detach().numpy().flatten()[0]
        future_preds.append(curr_pred)
        
        # push and pop from the window accordingly
        window = window[1:]
        window = torch.cat((window, torch.from_numpy(np.array([[curr_pred]]))))

    # create future points for JSON
    future_points = []
    for i in range(len(future_preds)):
        future_points.append({"x": i + all_act_vals.size, "y": np.array(future_preds[i]).astype(np.float64).flatten().tolist()[0]})

    return {
        "error_exists": False,
        "train" : {
            "labels": df["time"].to_numpy().tolist()[0:train_size],
            "pred": pred_train.astype(np.float64).flatten().tolist(),
            "act": act_train.astype(np.float64).flatten().tolist()
        },
        "test" : {
            "labels": df["time"].to_numpy().tolist()[train_size:df.shape[0] - 20],
            "pred": pred_test.astype(np.float64).flatten().tolist(),
            "act": act_test.astype(np.float64).flatten().tolist()
        },
        "all" : {
            "labels": df["time"].to_numpy().tolist()[0:df.shape[0] - 20],
            "pred": all_pred_vals.astype(np.float64).flatten().tolist(),
            "act": all_act_vals.astype(np.float64).flatten().tolist()
        },
        "future": {
            "values" : future_points,
            "labels" : np.arange(close_data_raw.shape[0] + num_intervals).tolist(),
        },
        "loss" : {
            "values": loss_vals.astype(np.float64).tolist(),
            "final": round(loss_vals.astype(np.float64).tolist()[-1], 6),
            "labels": np.arange(0, 100).tolist(),
        }
    }