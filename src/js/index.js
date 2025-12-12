document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form-group');
    const input = document.getElementById('description-input');
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const preview = document.querySelector('.preview-card');

    function setLoading(isLoading) {
    const btnSpan = document.getElementById('generate-button');
    btnSpan.innerHTML = isLoading ? `Gerando Background...` : "Gerar Background Mágico";
}
    
    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const description = input.value.trim();

        if (!description) {
            alert('Por favor, insira uma descrição.');
            return;
        }
        
        setLoading(true);
        try {
            const response = await fetch('https://n8n.srv830193.hstgr.cloud/webhook/4096b767-f3fb-4244-bb3c-2df7994c2262', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({description})
            });

            const data = await response.json();

            // const raw = await response.text();

            // console.log('RAW response:', raw);
            // console.log('Response status:', response.status);
            // console.log('Response headers:', [...response.headers.entries()]);

            // if (!raw || !raw.trim()) {
            //     const msg = `Resposta vazia do servidor (status ${response.status}). Verifique o endpoint no DevTools > Network.`;
            //     console.error(msg);
            //     htmlCode.textContent = msg;
            //     cssCode.textContent = 'Sem CSS retornado (resposta vazia)';
            //     preview.innerHTML = "";
            //     return;
            // }

            // try {
            //     await navigator.clipboard.writeText(raw);
            //     console.log('Resposta copiada para o clipboard');
            // } catch (e) {
            //     console.warn('Não foi possível copiar para o clipboard:', e);
            // }

            // if (!response.ok) {
            //     throw new Error(`Request failed ${response.status}: ${raw || '(sem corpo de texto)'}`);
            // }

            // const contentType = response.headers.get('content-type') || '';
            // let data = {};

            // if (!raw) {
            //     data = {};
            // } else if (contentType.includes('application/json')) {
            //     try {
            //         data = JSON.parse(raw);
            //     } catch (parseErr) {
            //         throw new Error('Resposta JSON inválida: ' + (raw || parseErr.message));
            //     }
            // } else {
            //     try {
            //         data = JSON.parse(raw);
            //     } catch {
            //         throw new Error('Resposta não-JSON do servidor: ' + raw);
            //     }
            // }

            htmlCode.textContent = data.code || "";
            cssCode.textContent = data.style || "";

            preview.style.display = "block";
			preview.innerHTML = data.code || "";
            
            let styleTag = document.getElementById("dynamic-style")

            if (styleTag) {
                styleTag.remove();
            }

            if (data.style) {
				styleTag = document.createElement("style");
				styleTag.id = "dynamic-style";
				styleTag.textContent = data.style;
				document.head.appendChild(styleTag);
			}

            // if (data.style) {
            //     const keyframesMatch = data.style.match(/@keyframes[\s\S]*?}\s*}/g);
            //     const keyframesCSS = keyframesMatch ? keyframesMatch.join('\n') : '';
                
            //     const cssWithoutKeyframes = data.style.replace(/@keyframes[\s\S]*?}\s*}/g, '');
                
            //     const orderedCSS = keyframesCSS + '\n' + cssWithoutKeyframes;

            //     styleTag = document.createElement("style");
            //     styleTag.id = "dynamic-style";
                
            //     const cssWithImportant = orderedCSS
            //         .replace(/animation:/g, 'animation: !important')
            //         .replace(/animation-duration:/g, 'animation-duration: !important')
            //         .replace(/animation-direction:/g, 'animation-direction: !important');
                
            //     styleTag.textContent = cssWithImportant;
            //     document.head.appendChild(styleTag);
            // }
            
            // setTimeout(() => {
            //     preview.style.display = "block";
            //     preview.innerHTML = data.code || "";
            //     void preview.offsetHeight;
            // }, 300);

            // preview.innerHTML = "";
            // void preview.offsetHeight;
            
            // requestAnimationFrame(() => {
            //     preview.style.display = "block";
            //     preview.innerHTML = data.code || "";
            //     void preview.offsetHeight;
            // });
            
        } catch (err){
            console.error("Erro ao gerar o fundo mágico:", err);
            htmlCode.textContent = "Não foi possível gerar o código HTML do fundo mágico. Por favor, tente novamente.";
            cssCode.textContent = "Não foi possível gerar o código CSS do fundo mágico. Por favor, tente novamente.";
            preview.innerHTML = "";
        } finally{
            setLoading(false);
        }
    })
})