(let ((in (open "data.txt")))
  (setq fwrd 0)
  (setq dwn 0)
  (setq dwn2 0)
  (setq aim 0)
  (setq val 0)
  (when in
    (loop for line = (read-line in nil)
      while line do (setq val (parse-integer (subseq line (position #\space line))))
      while line do (
        cond 
          (
            (string= "forward" (subseq line 0 (position #\space line)))
            (incf fwrd val)
            (incf dwn2 (* aim val))
          )
          (
            (string= "down" (subseq line 0 (position #\space line)))
            (incf dwn val)
            (incf aim val)
          )
          (
            (string= "up" (subseq line 0 (position #\space line)))
            (decf dwn val)
            (decf aim val)
          )
      )
    )
    (close in)
    (format T "Forward: ~d Down: ~d Mult: ~d Down2: ~d Mult2: ~d~%" fwrd dwn (* fwrd dwn) dwn2 (* fwrd dwn2))
  )
)
