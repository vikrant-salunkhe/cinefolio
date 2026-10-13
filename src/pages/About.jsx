import React from 'react';

export default function About() {
  return (
    <div style={{ maxWidth: 640 }}>
      <h2 className="page-heading">About CineFolio</h2>
      <p className="page-subheading" style={{ marginBottom: 20 }}>
        CineFolio is a Movie Information Portal built as an Advanced Web Technologies mini project.
      </p>
      <p style={{ lineHeight: 1.7, marginBottom: 16 }}>
        The portal lets users browse a catalogue of movies, search by title, director, or cast member,
        filter by genre, sort results, view full movie details, and maintain a personal watchlist that
        persists across sessions.
      </p>
      <p style={{ lineHeight: 1.7 }}>
        Phase I focuses on the core React architecture &mdash; component design, client-side routing,
        state management with Hooks and Context, and a data-service layer that currently serves mock
        data but is structured to plug into a live movie API in Phase II.
      </p>
    </div>
  );
}
