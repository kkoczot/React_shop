function checkIfExists(id, data, thisColor, colors, thisSize, sizes) {
  if(!data || !colors || !sizes) return;
  const test1 = Boolean(data.filter(d => d.clothes_id == id)[0]);
  if(!test1) return false;
  const test2 = getColors({clothe_id: id}, data, colors).includes(thisColor);
  if(!test2) return false;
  const test3 = Boolean(sizes.filter(size => size.size == thisSize)[0]);
  if(!test3) return false;
  return true;
}

function getColors(photo, clothesAttr, colors) {
  if(!clothesAttr || !colors) return;
  const thisClothe = [...new Set(clothesAttr.filter(clothe => clothe.clothes_id == photo.clothe_id).map(clothe => clothe.color_id))];
  const colorsOfClothe = colors.filter(color => {
    if(thisClothe.includes(color.id)) {
      return 1
    }
  }).map(color => color.color)
  return colorsOfClothe
}

function getName(photo, clothes) {
  if(!clothes) return;
  return clothes.filter(clothe => clothe.id == photo.clothe_id)[0].product;
}

function getPhotos(photos, s="/") {
  let lookedFor;
  let sortedLookedFor = [];
  try {
    lookedFor = photos.filter(d => d.path.includes(s));
    sortedLookedFor = lookedFor.reduce((acc, item) => {
      if(item?.clothe_id) {
        acc[acc.length - 1].push(item)
        acc[acc.length] = []
        return acc
      } else {
        acc[acc.length - 1].push(item)
        return acc
      }
    }, [[]])
  }
  catch (err) {
    //console.log(err)
  }
  sortedLookedFor.pop()
  return sortedLookedFor
}

function getPrice(photo, clothesAttr) {
  if(!clothesAttr) return;
  const price = String(clothesAttr.filter(clotheAttr => clotheAttr.clothes_id == photo.clothe_id)[0].price);
  if(price.length < 3) return `${price}.00`
  return price
}

function getRandomPhotos(photos) {
  for(let i = 0; i < photos.length; i++) {
    const a = photos[i];
    const b = Math.floor(Math.random() * photos.length);
    const c = photos[b];
    photos[i] = c;
    photos[b] = a;
  }
  return photos.slice(0, 6);
}

function getSpecificDesc(id, clothes) {
  const desc = clothes.filter(clothe => clothe.id == id)[0];
  return desc.description.split('|')
}

function getSpecificItem(clotheId, size, sizes, color, colors, clothesAttr) {
  if(!clotheId || !size || !color || !colors) return;
  const theseItems = clothesAttr.filter(clotheAttr => clotheAttr.clothes_id == clotheId);
  size = sizes.filter(s => s.size === size)[0];
  color = colors.filter(c => c.color === color)[0];
  return theseItems.filter(item => {if(item.size_id === size.id && item.color_id === color.id) return true})[0];
}

function getSpecificPhotos(id, photos) {
  if(!photos) return;
  const path = photos.filter(photo => photo.clothe_id == id)[0].path;
  return photos.filter(photo => photo.path.includes(path.slice(0, path.lastIndexOf('/'))))
}

function mouseHover(e) {
    e.target.classList.toggle("collection-second-change");
}

export {
  checkIfExists,
  getColors,
  getName,
  getPhotos,
  getPrice,
  getRandomPhotos,
  getSpecificDesc,
  getSpecificItem,
  getSpecificPhotos,
  mouseHover }