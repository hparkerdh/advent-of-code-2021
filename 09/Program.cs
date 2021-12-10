using System;
using System.IO;
using System.Collections.Generic;

SmokeBasin example = new SmokeBasin();
example.Process(@"data.txt");

public class SmokeBasin
{
  private List<List<Point>> _workingDepths = new List<List<Point>>();
  public void Process(string filename)
  {
    this._workingDepths.Clear();
    List<Point> sinks = new List<Point>();
    List<int> basinSizes = new List<int>();
    int currY = 0;

    foreach (string line in File.ReadLines(filename))
    {
      List<Point> pointLine = new List<Point>();
      for (int i = 0; i < line.Length; i++)
      {
        pointLine.Add(new Point(i, currY, int.Parse(line[i].ToString())));
      }
      this._workingDepths.Add(pointLine);
      if (this._workingDepths.Count == 2)
      {
        sinks.AddRange(this._getSinks(0));
      }
      else if (this._workingDepths.Count > 2)
      {
        sinks.AddRange(this._getSinks(this._workingDepths.Count - 2));
      }
      currY++;
    }
    sinks.AddRange(this._getSinks(this._workingDepths.Count - 1));

    this._printList(sinks);
    Console.WriteLine("Risk value: {0}", this._assessRiskValues(sinks));

    foreach (Point sink in sinks)
    {
      basinSizes.Add(this._getBasinSize(this._buildBasin(sink, sink)));
    }
    basinSizes.Sort();
    Console.WriteLine("Largest basins: {0} {1} {2}", basinSizes[basinSizes.Count-1], basinSizes[basinSizes.Count-2], basinSizes[basinSizes.Count-3]);
    Console.WriteLine("Largest basins product: {0}", basinSizes[basinSizes.Count-1] * basinSizes[basinSizes.Count-2] * basinSizes[basinSizes.Count-3]);
  }

  private int _assessRiskValues(List<Point> sinks)
  {
    int result = 0;
    foreach (Point sink in sinks)
    {
      result += sink.riskLevel;
    }
    return result;
  }

  private List<Point> _buildBasin(Point start, Point init)
  {
    List<Point> result = new List<Point>();
    start.BasinSink = init;
    result.Add(start);

    if (start.y > 0 && this._workingDepths[start.y - 1][start.x].available && this._workingDepths[start.y - 1][start.x].value >= start.value)
    {
      result.AddRange(this._buildBasin(this._workingDepths[start.y - 1][start.x], init));
    }
    if (start.x > 0 && this._workingDepths[start.y][start.x - 1].available && this._workingDepths[start.y][start.x - 1].value >= start.value)
    {
      result.AddRange(this._buildBasin(this._workingDepths[start.y][start.x - 1], init));
    }
    if (start.y < this._workingDepths.Count - 1 && this._workingDepths[start.y + 1][start.x].available && this._workingDepths[start.y + 1][start.x].value >= start.value)
    {
      result.AddRange(this._buildBasin(this._workingDepths[start.y + 1][start.x], init));
    }
    if (start.x < this._workingDepths[start.y].Count - 1 && this._workingDepths[start.y][start.x + 1].available && this._workingDepths[start.y][start.x + 1].value >= start.value)
    {
      result.AddRange(this._buildBasin(this._workingDepths[start.y][start.x + 1], init));
    }

    return result;
  }

  private int _getBasinSize(List<Point> basin)
  {
    int result = 0;
    foreach (Point p in basin)
    {
      if (p.value != 9)
      {
        result++;
      }
    }
    return result;
  }

  private List<Point> _getSinks(int workingIndex)
  {
    List<Point> result = new List<Point>();
    for (int i = 0; i < this._workingDepths[1].Count; i++)
    {
      if (this._isSink(
        this._workingDepths[workingIndex][i].value,
        workingIndex > 0 ? this._workingDepths[workingIndex - 1][i].value : -1,
        i < this._workingDepths[workingIndex].Count - 1 ? this._workingDepths[workingIndex][i + 1].value : -1,
        workingIndex < this._workingDepths.Count - 1 ? this._workingDepths[workingIndex + 1][i].value : -1,
        i > 0 ? this._workingDepths[workingIndex][i - 1].value : -1
      ))
      {
        result.Add(this._workingDepths[workingIndex][i]);
      }
    }

    return result;
  }

  private bool _isSink(int val, int top = -1, int right = -1, int bottom = -1, int left = -1)
  {
    if (top > -1 && top <= val) {
      return false;
    }
    if (right > -1 && right <= val) {
      return false;
    }
    if (bottom > -1 && bottom <= val) {
      return false;
    }
    if (left > -1 && left <= val) {
      return false;
    }
    return true;
  }

  private void _printList(List<Point> result) {
    string display = "";
    for (int i = 0; i < result.Count; i++)
    {
      display = display + result[i].value.ToString();
      if (i < result.Count - 1)
      {
        display = display + ", ";
      }
    }
    Console.WriteLine(display);
  }
}

class Point {

  private Point? _basinSink;
  private int _value;
  private int _x;
  private int _y;
  
  public Point(int x, int y, int val)
  {
    this._x = x;
    this._y = y;
    this._value = val;
  }

  public bool available
  {
    get => this._basinSink == null;
  }

  public Point? BasinSink
  {
    get => this._basinSink;
    set => this._basinSink = value;
  }

  public int riskLevel
  {
    get => this._value + 1;
  }

  public int value
  {
    get => this._value;
  }

  public int x
  {
    get => this._x;
  }

  public int y
  {
    get => this._y;
  }
}
