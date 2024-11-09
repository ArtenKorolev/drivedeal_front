select image.url
from car_model
join image
on image.id = car_model.image