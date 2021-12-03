
$count = 0;
$bitSums = @();

Get-Content .\data.txt | ForEach-Object {
  $count++
  for ($h = $bitSums.Length; $h -lt $_.length; $h++) {
    $bitSums += @(0);
  }
  for ($i = 0; $i -lt $_.length; $i++) {
    $bitSums[$i] += [System.Int32]::Parse($_[$i]);
  }
}

$half = $count / 2;
$gammaRate = 0;
$epsilonRate = 0;

[array]::Reverse($bitSums)

for ($j = 0; $j -lt $bitSums.length; $j++) {
  if ($bitSums[$j] -gt $half) {
    $gammaRate += [Math]::Pow(2, $j);
  } else {
    $epsilonRate += [Math]::Pow(2, $j);
  }
}

function GetBitSums {
  param (
    [string[]]$BinaryNumbers
  )

  $result = @()

  for ($i = 0; $i -lt $BinaryNumbers.Length; $i++) {
    for ($j = $result.Length; $j -lt $BinaryNumbers[$i].Length; $j++) {
      $result += @(0);
    }
    for ($j = 0; $j -lt $BinaryNumbers[$i].Length; $j++) {
      $result[$j] += [System.Int32]::Parse($BinaryNumbers[$i][$j]);
    }
  }

  $result
}

$oxygenCandidates = [string[]]@();
$co2ScrubbingCandidates = @();

[array]::Reverse($bitSums)
$firstIsOne = $bitSums[0] -gt $half;
Get-Content .\data.txt | ForEach-Object {
  if ($firstIsOne) {
    if ([System.Int32]::Parse($_[0]) -eq 1) {
      $oxygenCandidates += @($_);
    } else {
      $co2ScrubbingCandidates += @($_);
    }
  } else {
    if ([System.Int32]::Parse($_[0]) -eq 0) {
      $oxygenCandidates += @($_);
    } else {
      $co2ScrubbingCandidates += @($_);
    }
  }
}

$curr = 1;

while($oxygenCandidates.Length -gt 1 -and $curr -lt $oxygenCandidates[0].Length) {
  $oxygenBitSums = GetBitSums -BinaryNumbers $oxygenCandidates

  $tempCandidates = @();
  $isOne = $oxygenBitSums[$curr] -ge ($oxygenCandidates.Length / 2);

  foreach ($num in $oxygenCandidates) {
    if ($isOne) {
      if([System.Int32]::Parse($num[$curr]) -eq 1) {
        $tempCandidates += @($num);
      }
    } else {
      if([System.Int32]::Parse($num[$curr]) -eq 0) {
        $tempCandidates += @($num);
      }
    }
  }

  $oxygenCandidates = $tempCandidates

  $curr++;
}

$curr = 1;

while($co2ScrubbingCandidates.Length -gt 1 -and $curr -lt $co2ScrubbingCandidates[0].Length) {
  $co2BitSums = GetBitSums -BinaryNumbers $co2ScrubbingCandidates

  $tempCandidates = @();
  $isOne = $co2BitSums[$curr] -lt ($co2ScrubbingCandidates.Length / 2);

  foreach ($num in $co2ScrubbingCandidates) {
    if ($isOne) {
      if([System.Int32]::Parse($num[$curr]) -eq 1) {
        $tempCandidates += @($num);
      }
    } else {
      if([System.Int32]::Parse($num[$curr]) -eq 0) {
        $tempCandidates += @($num);
      }
    }
  }

  $co2ScrubbingCandidates = $tempCandidates;

  $curr++;
}

$oxygenRating = [Convert]::ToInt32($oxygenCandidates[0],2);
$co2ScrubbingRating = [Convert]::ToInt32($co2ScrubbingCandidates[0],2);

Write-Output "Gamma Rage: $gammaRate Epsilon Rage: $epsilonRate Mult: $($gammaRate * $epsilonRate) O2Rating: $oxygenRating CO2Rating: $co2ScrubbingRating Mult: $($oxygenRating * $co2ScrubbingRating)"
