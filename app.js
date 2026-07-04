(async () => {
  try {
    const encoded = (await fetch('bundle.txt', { cache: 'no-store' }).then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.text();
    })).trim();

    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);

    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    const html = await new Response(stream).text();
    document.open();
    document.write(html);
    document.close();
  } catch (error) {
    document.getElementById('app').innerHTML = `
      <section class="page"><article class="card">
        <h1>Nie udało się uruchomić Forma 45</h1>
        <p>Odśwież stronę. Jeżeli problem się powtarza, zaktualizuj Chrome lub Samsung Internet.</p>
        <small>${String(error)}</small>
      </article></section>`;
  }
})();
