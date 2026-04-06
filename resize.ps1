Add-Type -AssemblyName System.Drawing

$inputFile = "C:\Users\user\Documents\GitHub\shinji_ota\public\images\unnamed (13).png"
$outputFile = "C:\Users\user\Documents\GitHub\shinji_ota\public\images\post-safety-gear.png"

$img = [System.Drawing.Image]::FromFile($inputFile)
$ratio = $img.Height / $img.Width

# notebooklm images are usually 2752x1536 which is around 4MB. 
# We can resize it to 1200 width to save space.
$newWidth = 1200
$newHeight = [int][Math]::Round($newWidth * $ratio)

$newImg = New-Object System.Drawing.Bitmap $newWidth, $newHeight
$gr = [System.Drawing.Graphics]::FromImage($newImg)
$gr.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gr.DrawImage($img, 0, 0, $newWidth, $newHeight)
$newImg.Save($outputFile, [System.Drawing.Imaging.ImageFormat]::Png)

$gr.Dispose()
$newImg.Dispose()
$img.Dispose()

Remove-Item $inputFile -Force
Write-Host "Resized and renamed image successfully."
