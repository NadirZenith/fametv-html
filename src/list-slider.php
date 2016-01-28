<?php
for ($index = 1; $index <= 6; $index++) {
    ?>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2">
        <a class="video-list-item" href="#index">
            <?php
            $img_src = sprintf($thumb_mask, $index);
            /* d($index); */
            echo "<img src='{$img_src}' />";
            ?>
            <div class="title">
                Brincadeiras de TV e ...
            </div>
            <div class="detail">
                27/01/2016
            </div>
        </a>
    </div>
    <?php
}
?>