open System

[<EntryPoint>]
let main argv =
    (fun _ -> Console.ReadLine()) |>
    Seq.initInfinite |>
    Seq.takeWhile ((<>) null) |>
    Seq.iter
       (fun (s : string) ->
            let arr = s.Split([|' '|])
            let a = int64 arr.[0]
            let b = int64 arr.[1]
            /// solve test case and output answer
            printfn "%d" (abs (a - b))
       )
    0
