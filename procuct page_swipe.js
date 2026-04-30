if (document.getElementById("main_product_img_1") != null){
const pictures_1 = ["assets/beemwe/BUMPER_1.png", "assets/beemwe/BUMPER_2.png", "assets/beemwe/BUMPER_3.png"];

const Main_Pic_1 = document.getElementById("main_product_img_1");
const Arrow_Left_1 = document.getElementById("arrow_left_1");
const Arrow_Right_1 = document.getElementById("arrow_right_1");

let current_id_1 = 0

Arrow_Left_1.onclick = function(){
    if(current_id_1 == 0) {
    } else {
        current_id_1--;
        Main_Pic_1.src = pictures_1[current_id_1]
    }
}
Arrow_Right_1.onclick = function(){
    if(current_id_1 == pictures_1.length - 1) {
    } else {
        current_id_1++;
        Main_Pic_1.src = pictures_1[current_id_1]
    }
}
}
if (document.getElementById("main_product_img_2") != null) {
const pictures_2 = ["assets/beemwe/BBS_1.png", "assets/beemwe/BBS_2.png", "assets/beemwe/BBS_3.png"];

const Main_Pic_2 = document.getElementById("main_product_img_2");
const Arrow_Left_2 = document.getElementById("arrow_left_2");
const Arrow_Right_2 = document.getElementById("arrow_right_2");

let current_id_2 = 0

Arrow_Left_2.onclick = function(){
    if(current_id_2 == 0) {
    } else {
        current_id_2--;
        Main_Pic_2.src = pictures_2[current_id_2]
    }
}
Arrow_Right_2.onclick = function(){
    if(current_id_2 == pictures_2.length - 1) {
    } else {
        current_id_2++;
        Main_Pic_2.src = pictures_2[current_id_2]
    }
}
}