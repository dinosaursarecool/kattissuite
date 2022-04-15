program different;

var
    a : int64;
    b : int64;
    ans : int64;

begin
    while not eof() do
    begin
        readln(a, b);
        ans := abs(a - b);
        writeln(ans);
    end;
end.
