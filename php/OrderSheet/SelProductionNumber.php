<?php
  /* 21/05/17作成 */
  $userid = "webuser";
  $passwd = "";
  // print_r($_POST);
  
  try{
    $dbh = new PDO(
      'mysql:host=localhost; dbname=extrusion; charset=utf8',
      $userid,
      $passwd,
      array(
          PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
          PDO::ATTR_EMULATE_PREPARES => false
      )
    );

    $prepare = $dbh->prepare("

      SELECT 
        m_production_numbers.id,
        m_production_numbers.production_number
      FROM m_production_numbers
      WHERE m_production_numbers.production_number LIKE :production_number
      ORDER BY m_production_numbers.production_number
      LIMIT 30

    ");
    $prepare->bindValue(':production_number', $_POST['production_number'], PDO::PARAM_STR);

    $prepare->execute();
    $result = $prepare->fetchALL(PDO::FETCH_ASSOC);

    echo json_encode($result);
  } catch (PDOException $e){
    $error = $e->getMessage();
    echo json_encode($error);
  }
  $dbh = null;
?>
