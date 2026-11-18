"""Serve the site from the repo root for local testing: python3 tests/serve.py [port]"""
import functools, http.server, os, sys
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=root)
http.server.ThreadingHTTPServer(('127.0.0.1', port), handler).serve_forever()
