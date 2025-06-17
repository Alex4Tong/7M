const filenames = [
    'IMG_0224.JPG', 'IMG_0230.JPG', 'IMG_0275.JPG', 'IMG_0292.JPG',
    'IMG_0401.JPG', 'IMG_0461.JPG', 'IMG_0530.JPG', 'IMG_0643.JPG',
    'IMG_0650.JPG', 'IMG_0747.JPG', 'IMG_0792.JPG', 'IMG_5979.JPG',
    'IMG_5993.JPG', 'IMG_6022.JPG', 'IMG_6172.JPG', 'IMG_6189.JPG',
    'IMG_6190.JPG', 'IMG_6191.JPG', 'IMG_6194.JPG', 'IMG_6196.JPG',
    'IMG_6224.JPG', 'IMG_6236.JPG', 'IMG_6238.JPG', 'IMG_6241.JPG',
    'IMG_6252.JPG', 'IMG_6263.JPG', 'IMG_6577.JPG', 'IMG_6578.JPG',
    'IMG_6585.JPG', 'IMG_6586.JPG', 'IMG_6593.JPG', 'IMG_6615.JPG',
    'IMG_6616.JPG', 'IMG_6625.JPG', 'IMG_6659.JPG', 'IMG_6662.JPG',
    'IMG_6681.JPG', 'IMG_6705.JPG', 'IMG_6712.JPG', 'IMG_6715.JPG',
    'IMG_6716.JPG', 'IMG_6723.JPG', 'IMG_6743.JPG', 'IMG_6750.JPG',
    'IMG_6796.JPG', 'IMG_6797.JPG', 'IMG_6830.JPG', 'IMG_6858.JPG',
    'IMG_6880.JPG', 'IMG_6891.JPG', 'IMG_6903.JPG', 'IMG_6904.JPG',
    'IMG_6910.JPG', 'IMG_6920.JPG', 'IMG_6937.JPG', 'IMG_6949.JPG',
    'IMG_6966.JPG', 'IMG_6976.JPG', 'IMG_6978.JPG', 'IMG_6990.JPG',
    'IMG_7007.JPG', 'IMG_7010.JPG', 'IMG_7025.JPG', 'IMG_7044.JPG',
    'IMG_7083.JPG', 'IMG_7084.JPG', 'IMG_7107.JPG', 'IMG_7121.JPG',
    'IMG_7124.JPG', 'IMG_7125.JPG', 'IMG_7132.JPG', 'IMG_7165.JPG',
    'IMG_7170.JPG', 'IMG_7171.JPG', 'IMG_7189.JPG', 'IMG_7230.JPG',
    'IMG_7243.JPG', 'IMG_7250.JPG', 'IMG_7272.JPG', 'IMG_7278.JPG',
    'IMG_7296.JPG', 'IMG_7338.JPG', 'IMG_7497.JPG', 'IMG_7500.JPG',
    'IMG_7509.JPG', 'IMG_7555.JPG', 'IMG_7563.JPG', 'IMG_7568.JPG',
    'IMG_9515.JPG', 'IMG_9601.JPG', 'IMG_9603.JPG', 'IMG_9613.JPG',
    'lp_image 2.JPG', 'lp_image 3.JPG', 'lp_image 4.JPG', 'lp_image.JPG',
    'P1015504.JPG', 'Snow.JPG'
  ];
  
  const slider = document.getElementById('fan-slider');
  let currentIndex = 0;
  const slideWidth = 200;
  
  filenames.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.loading = 'lazy';
    img.classList.add('fan-slide');
    slider.appendChild(img);
  });
  
  function updateSlider() {
    requestAnimationFrame(() => {
      const offset = currentIndex * slideWidth;
      slider.style.transform = `translateX(-${offset}px)`;
    });
  }
  
  function rotateFan(direction) {
    currentIndex += direction;
  
    if (currentIndex < 0) {
      currentIndex = filenames.length - 1;
    } else if (currentIndex >= filenames.length) {
      currentIndex = 0;
    }
  
    updateSlider();
  }
  
  document.addEventListener('DOMContentLoaded', updateSlider);
  