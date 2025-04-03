<?php
// This is a simple PHP script to demonstrate database connectivity
// In a real implementation, you would use proper security measures and error handling

// Database connection parameters
$host = "localhost";
$username = "username";
$password = "password";
$database = "portfolio";

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Function to store contact form submissions
function storeContactSubmission($name, $email, $message) {
  global $conn;
  
  // Prepare statement to prevent SQL injection
  $stmt = $conn->prepare("INSERT INTO contact_submissions (name, email, message, submission_date) VALUES (?, ?, ?, NOW())");
  $stmt->bind_param("sss", $name, $email, $message);
  
  // Execute the statement
  $result = $stmt->execute();
  
  // Close statement
  $stmt->close();
  
  return $result;
}

// Function to get projects from database
function getProjects() {
  global $conn;
  
  $projects = array();
  
  // Query to get all projects
  $result = $conn->query("SELECT * FROM projects ORDER BY id DESC");
  
  if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
      // Get tags for this project
      $tags = array();
      $tagResult = $conn->query("SELECT tag_name FROM project_tags WHERE project_id = " . $row["id"]);
      
      if ($tagResult->num_rows > 0) {
        while($tagRow = $tagResult->fetch_assoc()) {
          $tags[] = $tagRow["tag_name"];
        }
      }
      
      $row["tags"] = $tags;
      $projects[] = $row;
    }
  }
  
  return $projects;
}

// Function to get a specific project by ID
function getProject($id) {
  global $conn;
  
  // Prepare statement to prevent SQL injection
  $stmt = $conn->prepare("SELECT * FROM projects WHERE id = ?");
  $stmt->bind_param("i", $id);
  $stmt->execute();
  $result = $stmt->get_result();
  
  if ($result->num_rows > 0) {
    $project = $result->fetch_assoc();
    
    // Get tags for this project
    $tags = array();
    $tagStmt = $conn->prepare("SELECT tag_name FROM project_tags WHERE project_id = ?");
    $tagStmt->bind_param("i", $id);
    $tagStmt->execute();
    $tagResult = $tagStmt->get_result();
    
    if ($tagResult->num_rows > 0) {
      while($tagRow = $tagResult->fetch_assoc()) {
        $tags[] = $tagRow["tag_name"];
      }
    }
    
    $project["tags"] = $tags;
    
    return $project;
  } else {
    return null;
  }
}

// Function to get skills from database
function getSkills() {
  global $conn;
  
  $skills = array();
  
  // Query to get all skills grouped by category
  $result = $conn->query("SELECT * FROM skills ORDER BY category, skill_name");
  
  if ($result->num_rows > 0) {
    // Group skills by category
    while($row = $result->fetch_assoc()) {
      $category = $row["category"];
      
      if (!isset($skills[$category])) {
        $skills[$category] = array();
      }
      
      $skills[$category][] = $row["skill_name"];
    }
  }
  
  return $skills;
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get the request data
  $data = json_decode(file_get_contents("php://input"), true);
  
  if (isset($data["action"])) {
    switch ($data["action"]) {
      case "contactSubmission":
        $name = $data["name"];
        $email = $data["email"];
        $message = $data["message"];
        
        if (storeContactSubmission($name, $email, $message)) {
          echo json_encode(["success" => true]);
        } else {
          echo json_encode(["success" => false, "error" => "Database error"]);
        }
        break;
        
      default:
        echo json_encode(["success" => false, "error" => "Invalid action"]);
        break;
    }
  } else {
    echo json_encode(["success" => false, "error" => "No action specified"]);
  }
}

// Handle GET request for data
if ($_SERVER["REQUEST_METHOD"] == "GET") {
  if (isset($_GET["action"])) {
    switch ($_GET["action"]) {
      case "getProjects":
        $projects = getProjects();
        echo json_encode(["success" => true, "projects" => $projects]);
        break;
        
      case "getProject":
        if (isset($_GET["id"])) {
          $project = getProject($_GET["id"]);
          if ($project) {
            echo json_encode(["success" => true, "project" => $project]);
          } else {
            echo json_encode(["success" => false, "error" => "Project not found"]);
          }
        } else {
          echo json_encode(["success" => false, "error" => "No project ID specified"]);
        }
        break;
        
      case "getSkills":
        $skills = getSkills();
        echo json_encode(["success" => true, "skills" => $skills]);
        break;
        
      default:
        echo json_encode(["success" => false, "error" => "Invalid action"]);
        break;
    }
  } else {
    echo json_encode(["success" => false, "error" => "No action specified"]);
  }
}

// Close connection
$conn->close();
?>

