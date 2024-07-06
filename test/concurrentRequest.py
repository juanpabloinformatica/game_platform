import asyncio
import websockets
import concurrent.futures
import time

# Define the WebSocket server URL
url = "ws://localhost:7777/ws"

# Function to send a single WebSocket message
async def send_websocket_message(uri, message):
    try:
        async with websockets.connect(uri) as websocket:
            await websocket.send(message)
            response = await websocket.recv()
            return response
    except Exception as e:
        return str(e)

# Function to handle the execution of a single WebSocket task
def websocket_task(uri, message):
    return asyncio.run(send_websocket_message(uri, message))

# Function to execute load test
def load_test(uri, message, num_requests, num_workers):
    with concurrent.futures.ThreadPoolExecutor(max_workers=num_workers) as executor:
        # Create a list of tasks
        tasks = [executor.submit(websocket_task, uri, message) for _ in range(num_requests)]

        # Process the results as they complete
        for future in concurrent.futures.as_completed(tasks):
            try:
                response = future.result()
                print(f"Request completed with response: {response}")
            except Exception as exc:
                print(f"Request generated an exception: {exc}")

# Main execution
if __name__ == "__main__":
    # Configuration
    num_requests = 100    # Total number of requests to send
    num_workers = 10      # Number of concurrent workers/threads
    message = "Test message"  # Message to send to the WebSocket server

    start_time = time.time()
    load_test(url, message, num_requests, num_workers)
    end_time = time.time()

    print(f"Completed {num_requests} requests in {end_time - start_time:.2f} seconds")

