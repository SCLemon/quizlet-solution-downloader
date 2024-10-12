var chapter = 12;
var type = 'Exercises'   // Exercises or Problems
var index=0;
var script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
document.head.appendChild(script);

async function captureScreenshot() {
    if(type == 'Problems'){
        document.querySelectorAll('.du7o3ew>.swzj698')[2*(chapter-1)].querySelectorAll('button')[1].click();
        await waitFor(1000)
    }

    const linkBlocks = document.querySelectorAll('.e1c1swpa')[chapter - 1].querySelectorAll('a');

    if (index === linkBlocks.length) {
        console.log('程式執行完畢');
        return;
    }

    linkBlocks[index].click();

    await waitFor(2000);

    document.querySelector('.ShowStepsButtonContainer > button').click();

    await waitFor(2000);

    const canvas = await html2canvas(document.body,{
        useCORS: true,
    });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `Ch${chapter}_${type}_${index+1}.png`;
    link.click();

    await waitFor(2000);

    console.log(`Ch${chapter}_${type}_${index+1}.png 下載完畢。`);
    index++;

    navigation.back();
    await waitFor(2000);

    await captureScreenshot();
}

async function waitFor(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

captureScreenshot();

