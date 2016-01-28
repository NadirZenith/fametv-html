
<?php
if (isset($_GET['switch_branch'])) {
    $new_branch = $_GET['switch_branch'];
    $command = sprintf('git checkout %s', $new_branch);
    $r = exec($command, $output);
    /* d('git checkout result', $output); */
    /* d('git checkout result', $r); */

    $actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    $url = preg_replace('/\?.*/', '', $actual_link);
    sleep(3);

    echo '<script type="text/javascript">
           window.location = "' . $url . '"
      </script>';
} else {

    $switch_link = '<a href="?switch_branch=%s">%s</a>';
    $branchs = [];

    exec('git branch ', $git_branch);
    /* dd($git_branch); */
    ?>
    <div id="nz-git-switch">
        <ul>
            <?php
            foreach ($git_branch as $branch) {
                $is_current = strpos($branch, '*') !== false;
                $branch_name = trim(trim($branch, '*'));
                ?>
                <li>
                    <?php
                    /*d($branch);*/
                    echo sprintf($switch_link, $branch_name, $branch);
                    ?>
                </li>
                <?php
            }
            ?>
        </ul>
    </div>
    <?php
}
?>
<style>
    #nz-git-switch{
        z-index: 10000;
        border-left: 25px solid blueviolet;
        padding: 5px;
        padding-left: 15px;
        font-size: 11px;
        width: 200px;
        background-color: #eee;
        position: fixed;
        top: 0;

        right: -175px;

        -webkit-transition: right 500ms ease-out 0.2s;
        -moz-transition: right 500ms ease-out 0.2s;
        -o-transition: right 500ms ease-out 0.2s;
        transition: right 500ms ease-out 0.2s;
    }
    #nz-git-switch:hover{
        right: 0px;

    }
    #nz-git-switch span{
        position:absolute;
        left: -5px;
        font-size: 16px;
        transform: rotate(90deg);
        transform-origin: left top 0;
        color: #000;
    }
    #nz-git-switch ul{
        padding: 0;
        margin: 0;

        list-style: none;
    }
</style>