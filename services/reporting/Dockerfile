FROM rust:latest as build
WORKDIR /app
COPY . .
RUN cargo build --release

FROM rust:latest as runner
WORKDIR /run
COPY --from=build /app/target/release/reporting .
CMD "./reporting"
EXPOSE 3000