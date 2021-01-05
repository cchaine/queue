import websockets
import asyncio
import json
import sqlite3
from argparse import ArgumentParser

queue = []
current = 0

users = []

async def run(websocket, path):
	global queue
	global current
	global users
	users += [websocket]
	
	while True:
		message = await websocket.recv()
		message = json.loads(message)
		if message["command"] == "next":
			current += 1
			if current >= len(queue):
				current = 0
		elif message["command"] == "new":
			queue = queue[:current] + [message["name"]] + queue[current:]
			if len(queue) > 1:
				current += 1
		elif message["command"] == "remove":
			del queue[message["index"]]
			if message["index"] < current:
				current -= 1
			elif current >= len(queue):
				current = 0
		elif message["command"] == "refresh":
			pass
		else:
			print("Unknown command")
		
		for ws in users:
			response = { "command": "refresh", "queue": queue, "current" : current }
			await ws.send(json.dumps(response))

# Parse arguments
parser = ArgumentParser(description='Manage queue on a local network')
parser.add_argument('-ip', help='specifies the server ip', required=True)
parser.add_argument('-p', help='specifies the server port', default=8001, required=False)
args = parser.parse_args()

ip = args.ip
port = args.p

print("Starting queue server on", ip, ":", port)
start_server = websockets.serve(run, ip, port)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
