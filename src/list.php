<?php
foreach ($list_items as $item) {
    // d($item);
    ?>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
    <a class="video-list-item" href="/show/<?php echo $item['id'] ?>">
            <?php
            // $img_src = sprintf($thumb_mask, $index);
            /* d($index); */
            echo "<img alt='img-title' src='/fametv-html/{$item['thumb']}' />";
            ?>
            <div class="title">
                <?php
                echo $item['title'];
                ?>
            </div>
            <div class="detail">
                27/01/2016
            </div>
        </a>
    </div>
    <?php
}
