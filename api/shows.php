<?php

include 'config.php';

$data = array(
    [
        'id' => 1,
        'title' => '1111111111111',
        /*'thumb' => sprintf($thumb_mask, 1),*/
        'video' => sprintf($video_mask, 1),
        'video' => array(
            'id' => 1,
            'preview' => sprintf($thumb_mask, 1),
            'reference' => sprintf($video_mask, 1),
            'html' => sprintf($video_mask, 1),//real api is video html
            
        )
    ], [
        'id' => 2,
        'title' => '2222222222222',
        'thumb' => sprintf($thumb_mask, 2),
        'video' => sprintf($video_mask, 2)
    ], [
        'id' => 3,
        'title' => '3333333333333',
        'thumb' => sprintf($thumb_mask, 3),
        'video' => sprintf($video_mask, 3)
    ], [
        'id' => 4,
        'title' => '4444444444444',
        'thumb' => sprintf($thumb_mask, 4),
        'video' => sprintf($video_mask, 4)
    ], [
        'id' => 5,
        'title' => '5555555555555',
        'thumb' => sprintf($thumb_mask, 5),
        'video' => sprintf($video_mask, 5)
    ], [
        'id' => 6,
        'title' => '6666666666666',
        'thumb' => sprintf($thumb_mask, 6),
        'video' => sprintf($video_mask, 6)
    ], [
        'id' => 7,
        'title' => '777777777777',
        'thumb' => sprintf($thumb_mask, 7),
        'video' => sprintf($video_mask, 7)
    ], [
        'id' => 8,
        'title' => '8888888888888',
        'thumb' => sprintf($thumb_mask, 8),
        'video' => sprintf($video_mask, 8)
    ],
);
sleep(1);

header('Content-Type: application/json');

if (isset($_GET['id'])) {
    echo json_encode($data[$_GET['id'] -1]);
    exit();
}
/*$data = array_slice($data, 5);*/
echo json_encode($data);
