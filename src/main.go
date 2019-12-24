package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

var (
	jsonData interface{}
)

func main() {
	port := "3005"
	if len(os.Args) > 1 {
		port = os.Args[1]
	}
	engine := gin.New()
	engine.Any("/save", func(c *gin.Context) {
		defer c.Request.Body.Close()
		buf, err := ioutil.ReadAll(c.Request.Body)
		if nil != err {
			c.JSON(http.StatusOK, "fail")
			return
		}

		err = json.Unmarshal(buf, &jsonData)
		if nil != err {
			c.JSON(http.StatusOK, "fail")
			return
		}
		c.JSON(http.StatusOK, "succeed")
	})
	engine.Any("/get", func(c *gin.Context) {
		c.JSON(http.StatusOK, jsonData)
	})
	engine.Run(":" + port)
}
