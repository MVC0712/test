<?php
  // 21/2/21 受け取ったファイルを
  // 所定の位置にファイルコピー、ファイル名の変更
  // $file_size_limit = 1024 * 1024;
  // print_r($_FILES);
  $updir = "../../../upload";
  $updir = "../upload";
  $tmp_file = @$_FILES['01']['tmp_name'];
  $filepath = pathinfo($_FILES['01']['name']);
  $copy_file = date("Ymd-His") . "." . $filepath['extension'];


  if($_FILES['01']['error'] == 2){
    echo "Too Big file";
  }elseif (is_uploaded_file($_FILES["01"]["tmp_name"])) {
    if (move_uploaded_file($tmp_file, "$updir" . "/" . "$copy_file")) {
      chmod("$updir" . "/" . "$copy_file", 0644);
      // echo "\n";
      // echo $_FILES["01"]["name"];
      echo $copy_file;
    } else {
      echo "sorry fault to upload file";
    }
  } else {
    echo "please, select photo file";
  }
?>