FROM golang:1.22.2-bookworm as builder
RUN apt update &&\
    mkdir -p $GOPATH/src/build
ADD ./backend  $GOPATH/src/build/ 
WORKDIR  $GOPATH/src/build
RUN go get ./... && \
    go build ./cmd/main.go  

FROM debian:bookworm-20210816-slim
# COPY --from=builder /go/src/build/main /app/
RUN apt update && apt install libc6 -y
COPY --from=builder /go/src/build/main /app/
WORKDIR /app
# folder in which the fuse is going to be mounted
# CMD ["./main"]
ENTRYPOINT ["./main"]
# CMD ["sleep","3600"]
