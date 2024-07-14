use axum::{routing::get, Router, Json};
use serde::{Serialize};



#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/hello", get(hello));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

#[derive(Serialize)]
struct HelloResponse {
    message: String,
}

async fn hello() -> Json<HelloResponse> {
    let response = HelloResponse {
        message: String::from("coucou")
    };

    Json(response)
}