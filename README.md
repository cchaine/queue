# Queue

December is a tough period at the makerspace, where many people come to use the laser cutter. This app helps us manage the flow of people so they don't have to wait in a line in the middle of the shop.

# Interface

<p align="center">
  <img width="800" alt="new-entry" src="https://user-images.githubusercontent.com/18381262/103634476-66bf0880-4f47-11eb-82af-5ac767b724e6.png">
</p>

<p align="center">
  <img width="800" alt="new-entry" src="https://user-images.githubusercontent.com/18381262/103634496-6d4d8000-4f47-11eb-891d-e76723eff928.png">
</p>

# Usage

To use the app, the `server` needs to be running on a machine in the local network.

```
git clone https://github.com/cchaine/queue
cd queue/server
python3 -m pip install websockets
python3 server.py -ip <your-local-ip> [-p <your-local-server-port>]
```

Then you need to change the ip and port in the `script.js` file. You can then run a python http server to serve the client.

```
cd ../client
python3 -m http.server --bind <your-local-ip>
```

Finally you can connect to the web page at address `<your-local-ip>:8000` on multiple computers and add new entries to the queue from there.

# To-Do

- The client and server *servers* need to be merged so you don't need to change the script.js server and you only have one program to open
