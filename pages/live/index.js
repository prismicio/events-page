function Video() {
  return (
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/5qap5aO4i9A"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  );
}

function Chat() {
  return (
    <iframe
      width="185"
      height="315"
      src="https://www.youtube.com/live_chat?v=O3K5CcQCKcU&embed_domain=vercel.app"
      frameborder="0"
    ></iframe>
  );
}

export default function Live() {
  return (
    <div>
      <Video />
      <Chat />
    </div>
  );
}
