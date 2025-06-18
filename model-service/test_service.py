
import pytest
import json
from service import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

# ✅ Health check
def test_health_check(client):
    res = client.get("/")
    assert res.status_code == 200
    assert res.get_json()["status"] == "Model server running ✅"

# ✅ Get symptoms list
def test_symptoms(client):
    res = client.get("/symptoms")
    assert res.status_code == 200
    data = res.get_json()
    assert "symptoms" in data
    assert isinstance(data["symptoms"], list)
    assert len(data["symptoms"]) > 0

# ✅ Predict with valid input
def test_predict_valid(client):
    payload = {"symptoms": ["symptom_1", "symptom_3", "symptom_7"]}
    res = client.post("/predict", data=json.dumps(payload), content_type="application/json")
    assert res.status_code == 200
    data = res.get_json()
    assert "predictions" in data
    assert len(data["predictions"]) == 3
    for p in data["predictions"]:
        assert "disease" in p
        assert "confidence" in p

# ❌ Predict with invalid input
def test_predict_invalid(client):
    payload = {"symptoms": "not-a-list"}  # Invalid
    res = client.post("/predict", data=json.dumps(payload), content_type="application/json")
    assert res.status_code == 400
    assert "error" in res.get_json()

# ❌ Predict with empty list
def test_predict_empty(client):
    payload = {"symptoms": []}
    res = client.post("/predict", data=json.dumps(payload), content_type="application/json")
    assert res.status_code == 400
    assert "error" in res.get_json()

def test_predict_unknown_symptom(client):
    payload = {"symptoms": ["alien_symptom"]}
    res = client.post("/predict", data=json.dumps(payload), content_type="application/json")
    assert res.status_code == 200
    data = res.get_json()
    assert "predictions" in data
    assert len(data["predictions"]) == 3
    assert "unmapped" in data
    assert "alien_symptom" in data["unmapped"]
