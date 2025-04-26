from flask import Flask, jsonify, request
from flask_cors import CORS
import firebase_admin
import os,json
from firebase_admin import credentials, firestore

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173","https://lhvspravachanams.vercel.app"],
     methods=["GET", "POST"],
     allowed_headers=["Content-Type", "Authorization"])

firebase_creds_str = os.getenv("FIREBASE_CREDS")
if not firebase_creds_str:
    raise Exception("FIREBASE_CREDS environment variable not set!")

firebase_creds_dict = json.loads(firebase_creds_str)
cred = credentials.Certificate(firebase_creds_dict)
firebase_admin.initialize_app(cred)

db = firestore.client()
# Collections
PDF_COLLECTION = "pdf_links"
VIDEO_COLLECTION = "video_links"
AUDIO_COLLECTION = "audio_links"

@app.route("/")
def home():
    return "Welcome to LHVS Pravachanams Backend (Firestore Version)"

# Helper to get documents from a collection
def get_documents(collection_name):
    docs = db.collection(collection_name).stream()
    return [{"id": doc.id, **doc.to_dict()} for doc in docs]

# Helper to add entries to a collection
def add_entries(collection_name, entries):
    batch = db.batch()
    collection_ref = db.collection(collection_name)
    for entry in entries:
        doc_ref = collection_ref.document()
        batch.set(doc_ref, entry)
    batch.commit()

# Helper to delete document by title
def delete_by_title(collection_name, title):
    docs = db.collection(collection_name).where("title", "==", title).stream()
    deleted = 0
    for doc in docs:
        db.collection(collection_name).document(doc.id).delete()
        deleted += 1
    return deleted

# ============ GET Routes ============

@app.route("/get_pdfs")
def get_pdfs():
    return jsonify(get_documents(PDF_COLLECTION))

@app.route("/get_videos")
def get_videos():
    return jsonify(get_documents(VIDEO_COLLECTION))

@app.route("/get_audios")
def get_audios():
    return jsonify(get_documents(AUDIO_COLLECTION))

# ============ UPLOAD Routes ============

@app.route("/upload_pdf_urls", methods=["POST"])
def upload_pdf_urls():
    data = request.get_json()
    entries = data.get("entries", [])
    if not entries:
        return jsonify({"error": "At least one entry (title + url) is required"}), 400

    cleaned_entries = []
    for entry in entries:
        title = entry.get("title", "").strip()
        url = entry.get("url", "").strip()
        if not title or not url:
            return jsonify({"error": "Each entry must have a title and a URL"}), 400
        cleaned_entries.append({"title": title, "url": url})

    add_entries(PDF_COLLECTION, cleaned_entries)
    return jsonify({"message": "PDF links uploaded successfully!"}), 201

@app.route("/upload_video_urls", methods=["POST"])
def upload_video_urls():
    data = request.get_json()
    entries = data.get("entries", [])
    if not entries:
        return jsonify({"error": "At least one entry (title + url) is required"}), 400

    cleaned_entries = []
    for entry in entries:
        title = entry.get("title", "").strip()
        url = entry.get("url", "").strip()
        if not title or not url:
            return jsonify({"error": "Each entry must have a title and a URL"}), 400
        cleaned_entries.append({"title": title, "url": url})

    add_entries(VIDEO_COLLECTION, cleaned_entries)
    return jsonify({"message": "Video links uploaded successfully!"}), 201

@app.route("/upload_audio_urls", methods=["POST"])
def upload_audio_urls():
    data = request.get_json()
    entries = data.get("entries", [])
    if not entries:
        return jsonify({"error": "At least one entry (title + url) is required"}), 400

    cleaned_entries = []
    for entry in entries:
        title = entry.get("title", "").strip()
        url = entry.get("url", "").strip()
        if not title or not url:
            return jsonify({"error": "Each entry must have a title and a URL"}), 400
        cleaned_entries.append({"title": title, "url": url})

    add_entries(AUDIO_COLLECTION, cleaned_entries)
    return jsonify({"message": "Audio links uploaded successfully!"}), 201

# ============ DELETE Routes ============

@app.route("/delete_pdf", methods=["POST"])
def delete_pdf():
    data = request.get_json()
    title = data.get("title", "").strip()
    if not title:
        return jsonify({"error": "Title is required"}), 400

    deleted = delete_by_title(PDF_COLLECTION, title)
    if deleted == 0:
        return jsonify({"error": "No PDF found with that title"}), 404

    return jsonify({"message": "PDF deleted successfully!"}), 200

@app.route("/delete_video", methods=["POST"])
def delete_video():
    data = request.get_json()
    title = data.get("title", "").strip()
    if not title:
        return jsonify({"error": "Title is required"}), 400

    deleted = delete_by_title(VIDEO_COLLECTION, title)
    if deleted == 0:
        return jsonify({"error": "No Video found with that title"}), 404

    return jsonify({"message": "Video deleted successfully!"}), 200

@app.route("/delete_audio", methods=["POST"])
def delete_audio():
    data = request.get_json()
    title = data.get("title", "").strip()
    if not title:
        return jsonify({"error": "Title is required"}), 400

    deleted = delete_by_title(AUDIO_COLLECTION, title)
    if deleted == 0:
        return jsonify({"error": "No Audio found with that title"}), 404

    return jsonify({"message": "Audio deleted successfully!"}), 200

if __name__ == "__main__":
    port = os.getenv("PORT", 5000)
    print(f"🟢 Flask app is now running at http://0.0.0.0:{port}")
    app.run(host="0.0.0.0", port=int(port), debug=True, use_reloader=False)
