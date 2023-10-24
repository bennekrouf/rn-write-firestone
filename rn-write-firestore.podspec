Pod::Spec.new do |s|
    s.name         = "rn-write-firestore"
    s.version      = "1.1.1"
    s.summary      = "A short description of rn-write-firestore."
  
    s.description  = <<-DESC
                     A longer description of rn-write-firestore.
                    DESC
  
    s.homepage     = "https://github.com/bennekrouf/rn-write-firestore"
  
    s.license      = { :type => "MIT", :file => "LICENSE" }
  
    s.author             = { "bennekrouf" => "mohamed.bennekrouf@gmail.com" }
    s.platform     = :ios, "9.0"
    
    s.source       = { :git => "https://github.com/bennekrouf/rn-write-firestore.git", :tag => s.version.to_s }
  
    s.source_files  = "ios/**/*.{h,m,swift}"
    s.dependency 'React'
  
    s.swift_version = '5.0'
  end
  