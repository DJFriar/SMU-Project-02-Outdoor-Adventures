Select *, LOCATE('park', name)
From parks Where locate('park', name)>0;