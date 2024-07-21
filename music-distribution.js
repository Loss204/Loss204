document.getElementById('musicForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Collect form data
    const artistName = document.getElementById('artistName').value;
    const songTitle = document.getElementById('songTitle').value;
    const email = document.getElementById('email').value;
    const dsp = document.getElementById('dsp').value;
    const localUpload = document.getElementById('localUpload').checked;

    const coverArtFile = document.getElementById('coverArt').files[0];
    const audioFile = document.getElementById('audioFile').files[0];

    // Validate file inputs
    if (!coverArtFile || !audioFile) {
        alert('Please upload both cover art and audio file.');
        return;
    }

    // Convert files to base64
    try {
        const coverArtData = await getBase64(coverArtFile);
        const audioData = await getBase64(audioFile);

        // Create form data object
        const formData = {
            artistName,
            songTitle,
            email,
            coverArtData,
            audioData,
            dsp,
            localUpload
        };

        // Save to local storage
        localStorage.setItem('musicFormData', JSON.stringify(formData));

        // Create DSP URL
        const uri = encodeURIComponent(`Artist: ${artistName}, Song: ${songTitle}, Email: ${email}`);
        let dspUrl = '';

        switch(dsp) {
            case 'youtube':
                dspUrl = `https://www.youtube.com/upload?data=${uri}`;
                break;
            case 'soundcloud':
                dspUrl = `https://soundcloud.com/upload?data=${uri}`;
                break;
            case 'audiomack':
                dspUrl = `https://audiomack.com/upload?data=${uri}`;
                break;
            case 'vimeo':
                dspUrl = `https://vimeo.com/upload?data=${uri}`;
                break;
            case 'tiktok':
                dspUrl = `https://www.tiktok.com/upload?data=${uri}`;
                break;
            default:
                alert('Invalid DSP selected');
                return;
        }

        // Handle local upload option
        if (localUpload) {
            const localUploadUrl = `https://music.youtube.com/upload?data=${uri}`;
            alert('Your song details and files have been saved locally for YouTube Music library upload.');
            window.location.href = localUploadUrl;
        } else {
            window.location.href = dspUrl;
        }
    } catch (error) {
        alert('Error processing files. Please try again.');
        console.error(error);
    }
});

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect distributor data
    const distributorName = document.getElementById('distributorName').value;
    const distributorEmail = document.getElementById('distributorEmail').value;
    const password = document.getElementById('password').value;

    // Create distributor data object
    const distributorData = {
        distributorName,
        distributorEmail,
        password
    };

    // Save to local storage
    localStorage.setItem('distributorData', JSON.stringify(distributorData));

    alert('Distributor signed up successfully!');
    document.getElementById('signupForm').reset();
});

// Convert file to base64
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
