from flask import Blueprint, jsonify

# Health check blueprint
bp = Blueprint('health', __name__)

@bp.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok"}), 200
