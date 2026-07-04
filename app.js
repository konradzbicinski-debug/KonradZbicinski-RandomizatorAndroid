(async () => {
  try {
    const bundleUrl = 'https://cdn.jsdelivr.net/gh/konradzbicinski-debug/KonradZbicinski-RandomizatorAndroid@3c8ef8cf9da1a1231dab55aee0e8b77ca26599cb/bundle.txt';
    const encoded = (await fetch(bundleUrl, { cache: 'no-store', mode: 'cors' }).then(r => {
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
        <p>Odśwież stronę. Jeżeli problem się powtarza, wyślij zrzut widocznego komunikatu.</p>
        <small>${String(error)}</small>
      </article></section>`;
  }
})();
