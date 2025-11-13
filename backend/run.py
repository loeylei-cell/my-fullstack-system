from app import create_app
import os

app = create_app()

if __name__ == '__main__':
    print("🚀 Starting Old Goods Thrift Flask Backend...")
    print("📍 Open: http://localhost:5000")
    print("🔍 Health check: http://localhost:5000/api/health")
    
    # Use PORT from environment if deployed, else default to 5000
    port = int(os.environ.get("PORT", 5000))
    
    # Turn off debug in production
    debug_mode = os.environ.get("FLASK_DEBUG", "False").lower() == "true"
    
    app.run(debug=debug_mode, host='0.0.0.0', port=port)
