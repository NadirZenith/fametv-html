<?php
for ($index = 1; $index <= 8; $index++) {
    ?>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <a class="video-list-item" href="#index">
            <?php
            $img_src = sprintf($thumb_mask, $index);
            /* d($index); */
            echo "<img src='{$img_src}' />";
            ?>
            <div class="title">
                FAME Porto - brincadeiras de TV e Moda na aula de José Figueiras
            </div>
            <div class="detail">
                27/01/2016
            </div>
        </a>
    </div>
    <?php
}
?>